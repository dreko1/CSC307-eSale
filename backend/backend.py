from dotenv import load_ipython_extension
from wtforms.fields.core import BooleanField
import bcrypt
from bson.objectid import ObjectId
from bson.json_util import dumps
from flask import Flask, request, flash, jsonify, redirect, url_for
'''from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user
)'''
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
            return jsonify(success=True), 201

#login should contain fields:
# username, password
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        req = request.get_json()

        #Check that all required arguments are provided in the request.
        if not (req['username'] and req['password']):
            return jsonify({'error': 'Must provide username and password!'}), 409

        #Verify user existance, and password correctness.
        user = User.get(req['username'])
        if not user:
            return jsonify({'error': 'This Username does not exist!'}), 404
        elif user.verify_credentials(req['password']):
            return jsonify(success=True), 201
        else:
            return jsonify({'error': 'This password is incorrect'}), 403

# post should include fields for:
# username, password, title, price, description, category, contact, city, state, zip, image.
@app.route('/post', methods=['POST'])
def post_listing():
    if request.method == 'POST':
        req = request.get_json()
        #Check that all required arguments are provided in the request.
        if not (req['username'] and req['password']):
            return jsonify({'error': 'Must provide username and password!'}), 409
        if not (req['title'] and req['price'] and req['description'] and req['category'] and req['contact']):
            return jsonify({'error': 'Must provide title, price, description, category, and contact!'}), 409
        if not (req['city'] and req['state'] and req['zip']):
            return jsonify({'error': 'Must provide city, state, and zip!'}), 409
        
        #Check that user exists and password is correct
        user = User.get(req['username'])
        if not user or not user.verify_credentials(req['password']):
            return jsonify({'error': 'Invalid credentials'}), 404

        #create the listing
        listing = Listing.new_listing(user, req['title'], req['price'], req['description'], req['category'], req['contact'])
        listing.set_location(req['city'], req['state'], req['zip'])
        listing.set_image(req['image'])

        #return the listing id
        
        return jsonify({"_id": str(listing['_id'])}), 201


@app.route('/post/<id>', methods=['POST', 'DELETE'])
def edit_listing(id):
    # TODO
    pass
    '''
    if request.method == 'POST': # Editing a listing
        
        listing = Listing({'_id': id})
        if listing.reload():
            listing
    elif request.method == 'DELETE': # Deleting a listing
        listing = Listing({'_id': id})
        '''

@app.route('/profile/<username>', methods=['GET', 'POST', 'DELETE'])
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
def get_likes(username):
    if request.method == 'GET': # Get users likes
        likes = User().get_likes(username)
        return jsonify(likes), 201
    elif request.method == 'POST': # Have an option for adding new likes?
        pass


@app.route('/browse/<category>', methods=['GET'])
def browse(category):
    if request.method == 'GET':  # Get users likes
        # Note: 'sort_param' should be the string of the Listing parameter the user wishes to sort by
        sort_param = request.args.get('sort_param') 
        # filters = request.args.get('filters')
        if category == 'all':
            listings = Listing().find_all(sort_param)
        else:
            listings = Listing().find_by_category(category, sort_param)
        return listings 


@app.route('/allposts', methods=['GET'])
def getallposts():
    posts = Listing.collection.find({})
    posts = dumps(list(posts))
    return posts
