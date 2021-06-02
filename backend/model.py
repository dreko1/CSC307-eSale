from pymongo import MongoClient, collection
from re import L
from bson import ObjectId
import os
import bcrypt
from dotenv import load_dotenv
from datetime import datetime


class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__


    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']

    db_client = MongoClient(MONGODB_URI)
    collection = db_client['test']['test']

    # Saves the item in the database if it does not already exist
    def save(self):
        if not self._id: # If not in db, add to db
            result = self.collection.insert_one(dict(self))
            self['_id'] = result.inserted_id
        else: # If in db already, return None
            return None
        return self
    
    # update the object according to the database, if the item exists return itself, else return none
    def reload(self):
        if self._id:
            resp = self.collection.find_one({'_id': self._id})
            if resp:
                for key in resp:
                    self[key] = resp[key]
                return self

    # Removes the item with the corresponding _id
    def remove(self):
        if self._id:
            resp = self.collection.delete_one({'_id': self._id})
            self.clear()
            return resp
    
    # update the db according to the object, if the item exists return itself, else return none
    def update(self):
        if self._id:
            resp = self.collection.update_one({'_id': self._id},{'$set': self})
            return self




class User(Model):
    collection = Model.db_client['users']['users_list']
    # .env file should include a statmement MONGODB_URI=mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild
    '''
        === General Format ===
        User: {
            username: str
            password: str
            email: str
            posts: list['listing_id']
            likes: list['listing_id']
            address: dict()
        }
    '''

    def new_user(username, password, email):
        if User.collection.find_one({'username': username}):
            return None
        pw_salt = bcrypt.gensalt()
        encrypted_password = bcrypt.hashpw(password.encode('utf8'), pw_salt)
        user = User({
            'username': username,
            'password': encrypted_password,
            #'salt': pw_salt, #I dont think we need to store this... do we?
            'email': email,
            'admin': False,
            'posts': list(),
            'likes': list(),
            'address': dict(),
        })
        user.save()
        return user

    def get(username):
        user = User.collection.find_one({'username': username})
        if user:
            return User(user)
    
    def verify_credentials(self, password):
        return bcrypt.checkpw(password.encode('utf8'), self['password'])


class Listing(Model):
    collection = Model.db_client['listings']['listings']
    # .env file should include a statmement MONGODB_URI=mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild

    def new_listing(user, title, price, description, category, contact):
        listing = Listing({
            'title': title, #string
            'price': price, #float
            'description': description, #str
            'category': category, #str
            'userId': user['_id'], #id
            'username': user['username'], #str (username)
            'contact': contact, #str
            'location': {
                'city': '', #str
                'state': '', #str
                'zip': '' #str
            },
            'image': '', #str
            'time_posted': datetime.today().strftime('%m-%d-%Y, %H:%M:%S') #str
            # 'timestamp': {
            #     'date': datetime.now().time().strftime('%m/%d/%Y')
            #     'time': datetime.now().time().strftime('%H:%M:%S')
            # }
        })
        listing.save()
        user['posts'].append(listing['_id'])
        user.update()
        return listing
    
    def set_location(self, city, state, zip):
        self['location'] = {
            'city': city,
            'state': state,
            'zip': zip
        }
        self.update()

    def set_image(self, image):
        self['image'] = image
        self.update()
    # ====================================
    # Functions for searching by filters:
    # ====================================

    sort_by_title = {'title': 1}
    sort_by_title_reverse = {'title': -1}
    sort_by_price = {'price': 1}
    sort_by_price_reverse = {'price': -1}
    sort_by_time = {'time_posted': 1}
    sort_by_time_reverse = {'time_posted': -1}

    def find_all(query={}, sort_param=None):
        return Listing.collection.find(query)

    def find_by_category(category, sort_param=None):
        return Listing.find_all({'category': category}, sort_param)

