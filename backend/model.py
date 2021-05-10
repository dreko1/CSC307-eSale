from pymongo import MongoClient
from bson import ObjectId
from os import environ
from dotenv import load_dotenv


class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = environ['MONGODB_URI']

    db_client = MongoClient(MONGODB_URI)
    db_users = db_client["users"]["users_list"]
    db_admins = db_client["users"]["admin_list"]
    db_listings = db_client["listings"]["listings"]
    db_images = db_client["listings"]["images"]
    '''
    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                {"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result:
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp
    '''
    def create_listing(self, user, listing_text, contact_info, image=None):
        # put listing into database
        # get its id
        # then add that id to the list of posts a user has made,
        # return the listing
        pass

    def get_listing(self, listing_id):
        pass

    def delete_listing(self, listing):
        pass

    def add_image_to_listing(self, image):
        pass

    def create_user(self, username, hashed_password, salt):
        pass

    def get_user(self, username):
        return self.db_users.find_one({"username": username})

    def delete_user(self, user):
        pass

    def user_is_admin(self, username):
        if self.db_admins.find_one({"username": username}):
            return True
        return False
