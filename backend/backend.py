import bcrypt as b
from model import Model
from flask import Flask
from flask import request
from flask import jsonify
import json
# for linking frontend-backend
from flask_cors import CORS
# we will need to store username, hashed password, and the salt used to hash in the database
app = Flask(__name__)
# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)

database = Model()

# this method will need to be called by the method the queries the database
def validate_password(pw, db_pw, db_salt):
    hashed_password = b.hashpw(pw, db_salt)
    return b.checkpw(hashed_password, db_pw)

@app.route('/login', methods=['Post'])
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

@app.route('/newuser', methods=['Post'])
def new_user():
    username = request.args.get('username')
    password = request.args.get('password')
    if username and password:
        salt = b.gensalt()
        password = b.hashpw(password, salt)
        user = database.get_user(username)
        if not user:
            database.create_user(username, password, salt)
            user = database.get_user(username)
            if user:
                return user
    return {}