from re import L
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

    #creates a new document in the database with the same form as item.
    def db_add(self, collection, item):
        result = collection.insert_one(item)
        if result:
            return self.db_get(collection, result.inserted_id)
        return None
    
    #removes the database document which has an id equal to the passed-in items id.
    def db_remove(self, collection, item):
        return self.db_delete(collection, item["_id"])
    
    #removes the database document with the corresponding id.
    def db_delete(self, collection, item_id):
        result = collection.delete_one({"_id": item_id})
        if result:
            return True
        return False

    #updates the database document which has an id equal to the passed-in items id to the other attributes present in item.
    def db_update(self, collection, item):
        item_id = item["_id"]
        result = collection.update_one({"_id": item_id}, {"$set": item})
        return self.db_get(collection, item_id)

    #returns the item in the database with the corresponding id.
    def db_get(self, collection, item_id):
        return collection.find_one({"_id": item_id})

    #returns the item in the database which has the same id as item.
    def db_reload(self, collection, item):
        return self.db_get(collection, item["_id"])

    #creates a listing with the given arguments, adds it to the database (and image if provided), then returns the listing.
    def create_listing(self, user, listing_text, contact_info, image=None):
        imageId = None
        if image:
            imageAddResult = self.db_add(self.db_images, image)
            if imageAddResult:
                imageId = imageAddResult["_id"]
        return self.db_add(self.db_listings, {
            "poster": user,
            "text": listing_text,
            "contact": contact_info,
            "image": imageId
        })

    #deletes the listing from the database and its corresponding image (if applicable)
    def delete_listing(self, listing):
        imageId = listing["image"]
        if imageId:
            self.db_delete(self.db_images, imageId)
        self.db_remove(self.db_listings, listing)
        return

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
