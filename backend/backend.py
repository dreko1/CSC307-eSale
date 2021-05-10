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


# this method will need to be called by the method the queries the database
def validate_password(pw, pw2):
    if pw == pw2:
        return True
    else:
        return False
'''
    hashed_password = b.hashpw(b'test', b.gensalt())
    if b.checkpw(pw,hashed_password):
        # pass
        return 0
    # fail
    return 1 

validate_password(b'test')
validate_password(b'fail test')

'''

@app.route('/users', methods=['Get'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    if username and password:
        correspondingUser = Model().find_by_username(username)
        if correspondingUser:
            if validate_password(password, correspondingUser["password"]):
                return correspondingUser
    return {}