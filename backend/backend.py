from wtforms.fields.core import BooleanField
import bcrypt
from bson.objectid import ObjectId
from flask import Flask, request, flash, jsonify, redirect, url_for
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

# database = Model()

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>Page Not Found.</p>", 404


@app.route('/')
def index():
    return redirect(url_for('login'))

# this method will need to be called by the method the queries the database
def validate_password(pw, db_pw, db_salt):
    hashed_password = bcrypt.hashpw(pw, db_salt)
    return bcrypt.checkpw(hashed_password, db_pw)


@app.route('/register', methods=['POST'])
def register():  
    if request.method == 'POST':
        new_user = request.get_json()
        if new_user['username'] and new_user['password']: # Check that all required fields were entered
            if User.get(new_user): # Check if user exists
                # flash('This Username already exists!')
                return jsonify({'error': 'This Username already exists!'})
            password = new_user['password']
            pw_salt = bcrypt.gensalt()
            new_user['password'] = bcrypt.hashpw(password, pw_salt)
            User.add(new_user)
            check = User.get_user(new_user)
            if check:
                return check


@app.route('/login', methods=['POST'])
def login():
    requestData = request.get_json()
    username = requestData['username']
    password = requestData['password']
    print(requestData)
    if username and password:
        user = User.get(username)
        if user and validate_password(password, user["password"], user["salt"]):
            return user


@app.route('/post', methods=['POST'])
def post_listing():
    if request.method == 'POST':
        listing = request.get_json()
        resp = Listing.add(listing)
        return resp


@app.route('/profile/<username>', methods=['GET', 'POST', 'DELETE'])
def get_profile(username):
    # Not sure if any of this is right
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
            resp = jsonify(success=True)
            resp.status_code = 204
            return resp
        else:
            return jsonify({"error": "Could not find account in database"}), 404


@app.route('/profile/<username>/likes', methods=['GET', 'POST'])
def get_likes(username):
    if request.method == 'GET': # Get users likes
        likes = User.get_likes(username)
        return likes
    elif request.method == 'POST': # Have a button for adding new likes?
        pass
