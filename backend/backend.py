from dotenv import load_ipython_extension
import bcrypt
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
# we will need to store username, hashed password, and the salt used to hash in the database
from model import User, Listing

app = Flask(__name__)
# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)


# Init Flask-Login
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)


@login_manager.user_loader
def load_user(username):
    return User().get(username)

@app.errorhandler(404)
def page_not_found():
    return "<h1>404</h1><p>Page Not Found.</p>", 404

@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/signup', methods=['POST'])
def register():  
    if request.method == 'POST':
        new_user = request.get_json()
        print("\n" ,new_user, "\n")

        # Check that all required fields were entered
        if new_user['username'] and new_user['password']:
            if User().get(new_user['username']): # Check if user exists
                # flash('This Username already exists!')
                return jsonify({'error': 'This Username already exists!'}), 409
            if User().get(new_user['email']):  # Check if user exists
                # flash('This email already exists!')
                return jsonify({'error': 'An account with this email address already exists!'}), 409
            pw_salt = bcrypt.gensalt()
            encrypted_password = bcrypt.hashpw(new_user['password'].encode('utf8'), pw_salt)
            user_to_add = {
                'username': new_user['username'],
                'password': encrypted_password,
                'email': new_user['email'],
                'posts': list(),
                'likes': list(),
                'address': dict(),
            }
            user_to_add = User(user_to_add)
            user_to_add.save()
            return jsonify(new_user), 201


# this method will need to be called by the method the queries the database
def validate_password(pw, db_pw):
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
            elif validate_password(password, user["password"]):
                login_user(user)
                return jsonify({"message": "login success"}), 200
            else:
                return jsonify({"error": "This password is incorrect"}), 403


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "logout success"}), 200


@app.route('/post', methods=['POST'])
@login_required
def post_listing():
    if request.method == 'POST':
        listing_to_add = request.get_json()
        print(listing_to_add)
        user = User().get(listing_to_add["username"])
        print(user)
        if not validate_password(listing_to_add["password"], user["password"]):
            return jsonify({"error": "Invalid user credentials"}), 403
      
        listing_to_add = {
            'seller': user['username'],
            'title': listing_to_add['title'],
            'price': listing_to_add['price'],
            'description': listing_to_add['description'],
            'category': listing_to_add['category'],
            'contact': listing_to_add['contact'],
            'image': listing_to_add['image'],
            'location': {
                'state':  listing_to_add['state'],
                'city': listing_to_add['city'],
                'zip_code': listing_to_add['zip_code']
            },
            'time_posted': datetime.today().strftime("%m-%d-%Y, %H:%M:%S"),
            # 'timestamp': {
            #     'date': datetime.now().time().strftime("%m/%d/%Y")
            #     'time': datetime.now().time().strftime("%H:%M:%S")
            # }
            "image": listing_to_add["image"]
        }
        listing = Listing(listing_to_add)
        listing.save()
        #user['posts'].add(listing["_id"])
        return jsonify(success=True), 201


@app.route('/post/<id>', methods=['POST', 'DELETE'])
@login_required
def edit_listing(id):
    if request.method == 'POST': # Editing a listing
        listing = Listing({'_id': id})
        if listing.reload():
            listing
    elif request.method == 'DELETE': # Deleting a listing
        listing = Listing({'_id': id})


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
            return jsonify({"error": "Could not find account in database"}), 404


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
        # Note: 'sort_param' should be the string of the Listing parameter the user wishes to sort by
        sort_param = request.args.get('sort_param') 
        # filters = request.args.get('filters')
        if category == 'all':
            listings = Listing().find_all(sort_param)
        else:
            listings = Listing().find_by_category(category, sort_param)
        return listings 

