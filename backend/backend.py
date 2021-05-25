from wtforms.fields.core import BooleanField
import bcrypt
from bson.objectid import ObjectId
from flask import Flask, request, flash, jsonify, redirect, url_for
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

# database = Model()

@app.errorhandler(404)
def page_not_found():
    return "<h1>404</h1><p>Page Not Found.</p>", 404

# @app.route('/')
# def index():
#     return redirect(url_for('login'))


@app.route('/signup', methods=['POST'])
def register():  
    if request.method == 'POST':
        new_user = request.get_json()
        print("\n" ,new_user, "\n")

        # Check that all required fields were entered
        if new_user['username'] and new_user['password']:
            if User().get(new_user['username']): # Check if user exists
                # flash('This Username already exists!')
                print("HERE")
                return jsonify({'error': 'This Username already exists!'}), 409
            pw_salt = bcrypt.gensalt()
            encrypted_password = bcrypt.hashpw(new_user['password'].encode('utf8'), pw_salt)
            user_to_add = {
                'username': new_user['username'],
                'password': encrypted_password,
                'salt': pw_salt,
                'email': new_user['email'],
                'posts': list(),
                'likes': list(),
                'address': dict(),
            }
            user_to_add = User(user_to_add)
            user_to_add.save()
            return jsonify(new_user), 201


# this method will need to be called by the method the queries the database
def validate_password(pw, db_pw, db_salt):
    return bcrypt.checkpw(pw.encode('utf8'), db_pw)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        requestData = request.get_json()
        username = requestData['username']
        password = requestData['password']
        print(requestData)
        if username and password:
            user = User().get(username)
            print(user)
            if not user:
                return jsonify({'error': 'This Username does not exist!'}), 404
            elif validate_password(password, user["password"], user["salt"]):
                return jsonify(success=True), 201
            else:
                return jsonify({"error": "This password is incorrect"}), 403


@app.route('/post', methods=['POST'])
def post_listing():
    if request.method == 'POST':
        requestJson = request.get_json()
        print(requestJson)
        user = User().get(requestJson["username"])
        print(user)
        if not validate_password(requestJson["password"], user["password"], user["salt"]):
            return jsonify({"error": "Invalid user credentials"}), 403
        listing = {
            "price": 0,
            "name": requestJson["name"],
            "description": requestJson["description"],
            "categories": "",
            "seller": user["username"],
            "contact": requestJson["contact"],
            "location": {
                "state": "CA",
                "zip": "93410"
            },
            "time_posted": datetime.now().time().strftime("%m/%d/%Y, %H:%M:%S"),
            "image": requestJson["image"]
        }
        print(listing)
        listing = Listing(listing)
        listing.save()
        #user['posts'].add(listing)
        return jsonify(success=True), 201
    else:
        return jsonify(success=False), 404



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
            resp = jsonify(success=True)
            resp.status_code = 204
            return resp
        else:
            return jsonify({"error": "Could not find account in database"}), 404


@app.route('/profile/<username>/likes', methods=['GET', 'POST'])
def get_likes(username):
    if request.method == 'GET': # Get users likes
        likes = User().get_likes(username)
        return jsonify(likes), 201
    elif request.method == 'POST': # Have an option for adding new likes?
        pass
