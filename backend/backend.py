from dotenv import load_ipython_extension
from wtforms.fields.core import BooleanField
import bcrypt
from bson.objectid import ObjectId
from bson.json_util import dumps
from flask import Flask, request, flash, jsonify, redirect, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user
)
from datetime import datetime
import json

# for linking frontend-backend
from flask_cors import CORS

# For mongo database
from model import User, Listing

# we will need to store username, hashed password, and the salt used to hash in the database
app = Flask(__name__)

# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)

app.secret_key = 'some key'
# Init Flask-Login
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)


@login_manager.user_loader
def load_user(username):
    return User().get(username)


@app.errorhandler(404)
def page_not_found():
    return '<h1>404</h1><p>Page Not Found.</p>', 404

@app.route('/')
def index():
    return redirect(url_for('login'))


#register should contain fields:
# username, password, email
@app.route('/signup', methods=['POST'])
def register():  
    if request.method == 'POST':
        req = request.get_json()

        # Check that all required fields were entered
        if not (req['username'] and req['password'] and req['email']):
            return jsonify({'error': 'Must provide username, password, and email!'}), 409

        #Build user object (returns None if username is taken)
        user = User.new_user(req['username'], req['password'], req['email'])
        if user == None:
            return jsonify({'error': 'This Username already exists!'}), 409
        else:
            login_user(user)
            return jsonify(success=True), 201

#login should contain fields:
# username, password
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        req = request.get_json()

        #Check that all required arguments are provided in the request.
        if not (req['username'] and req['password']):
            return jsonify({'message': 'Must provide username and password!'}), 409

        #Verify user existance, and password correctness.
        user = User.get(req['username'])
        if not user:
            return jsonify({'message': 'This Username does not exist!'}), 404
        elif user.verify_credentials(req['password']):
            login_user(user)
            return jsonify(success=True), 201
        else:
            return jsonify({'message': 'This password is incorrect'}), 403


@app.route('/logout')
@login_required
def logout():
    pass
    logout_user()
    return jsonify({"message": "logout success"}), 200

# post should include fields for:
# username, password, title, price, description, category, contact, city, state, zip, image.
@app.route('/post', methods=['POST'])
# @login_required
def post_listing():
    if request.method == 'POST':
        req = request.get_json()
        #Check that all required arguments are provided in the request.
        if not (req['username'] and req['password']):
            return jsonify({'message': 'Must be signed in to post!'}), 409
        if not (req['title'] and req['price'] and req['description'] and req['category'] and req['contact']):
            return jsonify({'message': 'Must provide title, price, description, category, and contact!'}), 409
        
        #Check that user exists and password is correct
        user = User.get(req['username'])
        if not user or not user.verify_credentials(req['password']):
            return jsonify({'message': 'Invalid credentials'}), 404

        #create the listing
        listing = Listing.new_listing(user, req['title'], req['price'], req['description'], req['category'], req['contact'])
        listing.set_location(req['city'], req['state'], req['zip'])
        listing.set_image(req['image'])

        #return the listing id
        
        return jsonify({"_id": str(listing['_id'])}), 201


@app.route('/profile/<username>', methods=['GET', 'POST', 'DELETE'])
@login_required
def get_profile(username):
    # Not sure if any of this is correct
    if request.method == 'GET':  # Get users likes
        get_likes = request.args.get('likes')
        if get_likes:
            Flask.redirect(url_for('get_likes'))
        else: 
            user = User({'Username': username})
            return jsonify(user)
    elif request.method == 'POST':  # Option for changing personal information ?
        pass
    elif request.method == 'DELETE': # Delete account
        user = User({'Username': username})
        if user.reload(): # If user exists: (if this is ever false we have a problem)
            user.remove()
            resp = jsonify(success=True), 204
            return resp
        else:
            return jsonify({'error': 'Could not find account in database'}), 404


@app.route('/profile/<username>/likes', methods=['GET', 'POST'])
@login_required
def get_likes(username):
    if request.method == 'GET': # Get users likes
        likes = User().get_likes(username)
        return jsonify(likes), 201
    elif request.method == 'POST': # Have an option for adding new likes?
        pass


@app.route('/browse/<category>', methods=['GET'])
def browse(category):
    if request.method == 'GET':  # Get users likes
        print(category)
        if category == 'All':
            listings = Listing.find_all()
        else:
            listings = Listing.find_by_category(category)
        return dumps(list(listings)) 
