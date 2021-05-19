from wtforms.fields.core import BooleanField
import bcrypt as b
from bson.objectid import ObjectId
from model import Model
from flask import Flask, request, flash, render_template, jsonify, redirect, url_for
from wtforms import Form, StringField, PasswordField, validators  # Pip install flask-wtf
import json
# for linking frontend-backend
from flask_cors import CORS
# we will need to store username, hashed password, and the salt used to hash in the database
app = Flask(__name__)
# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)

database = Model()

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>Page Not Found.</p>", 404


@app.route('/')
def index():
    return redirect(url_for('login'))

# this method will need to be called by the method the queries the database
def validate_password(pw, db_pw, db_salt):
    hashed_password = b.hashpw(pw, db_salt)
    return b.checkpw(hashed_password, db_pw)

@app.route('/login', methods=['POST'])
def login():
    requestData = request.get_json()
    username = requestData['username']
    password = requestData['password']
    print(requestData)
    if username and password:
        user = database.get_user(username)
        if user and validate_password(password, user["password"], user["salt"]):
            return user
    return {}


# Form for easier registration handling
class RegistrationForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=20)])
    email = StringField('Email Address', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [validators.Required(),
                                          validators.EqualTo('confirm', message='Passwords must match.')])
    confirm = PasswordField('Repeat Password')

    # Terms of Service (if we even want to include it)
    # accept_tos = BooleanField('I accept the <a href="/tos/">Terms of Service</a>' [validators.Required()])


@app.route('/register', methods=['POST'])
def new_user():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        username = form.username.data
        email = form.email.data
        salt = b.gensalt()
        password = b.hashpw(form.password.data, salt)
        user = database.get_user(username)
        if user:
            flash('This Username already exists!')
            return form
        else:
            database.create_user(username, email, password, salt)
            user = database.get_user(username)
            if user:
                return user
    return {}


# @app.route('/newuser', methods=['Post'])
# def new_user():  
    # username = request.args.get('username')
    # password = request.args.get('password')
    # if username and password:
    #     salt = b.gensalt()
    #     password = b.hashpw(password, salt)
    #     user = database.get_user(username)
    #     if not user:
    #         database.create_user(username, password, salt)
    #         user = database.get_user(username)
    #         if user:
    #             return user
    # return {}


@app.route('/post', methods=['POST'])
def post_listing():
    requestData = request.get_json()
    user = requestData['username']
    text = requestData['text']
    contact = requestData['contact']
    listing = database.create_listing(user, text, contact, {"image": None})
    return {}

@app.route('/profile', methods=['GET', 'POST'])
def get_information():
    if request.method == 'GET': # Get users likes
        # flask.redirect ?
        requestData = request.get_json()
    elif request.method == 'POST':
        pass
