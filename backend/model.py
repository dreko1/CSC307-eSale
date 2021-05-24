from pymongo import MongoClient, collection
from re import L
from bson import ObjectId
import os
from dotenv import load_dotenv


class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    # Saves the item in the database if it does not already exist
    def save(self):
        if not self._id: # If not in db, add to db
            self.collection.insert_one(self)
            self._id = str(self._id)
        else: # If in db already, update item
            self.collection.update_one({"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)
    
    # Reload the db, if the item exists return True, else return False
    def reload(self):
        if self._id:
            resp = self.collection.find_one({"_id": ObjectId(self._id)})
            if resp:
                self.update(resp)
                self._id = str(self._id)
                return True
        return False

    # Removes the item with the corresponding _id
    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp
    
    # #removes the database document with the corresponding id.
    # def db_delete(self, collection, item_id):
    #     result = collection.delete_one({"_id": item_id})
    #     if result:
    #         return True
    #     return False

    # #updates the database document which has an id equal to the passed-in items id to the other attributes present in item.
    # def db_update(self, collection, item):
    #     item_id = item["_id"]
    #     result = collection.update_one({"_id": item_id}, {"$set": item})
    #     return self.db_get(collection, item_id)

    # #returns the item in the database with the corresponding id.
    # def db_get(self, collection, item_id):
    #     return collection.find_one({"_id": item_id})

    # #returns the item in the database which has the same id as item.
    # def db_reload(self, collection, item):
    #     return self.db_get(collection, item["_id"])

    # #creates a listing with the given arguments, adds it to the database (and image if provided), then returns the listing.
    # def create_listing(self, user, listing_text, contact_info, image=None):
    #     imageId = None
    #     if image:
    #         imageAddResult = self.db_add(self.db_images, image)
    #         if imageAddResult:
    #             imageId = imageAddResult["_id"]
    #     return self.db_add(self.db_listings, {
    #         "poster": user,
    #         "text": listing_text,
    #         "contact": contact_info,
    #         "image": imageId
    #     })

    # #deletes the listing from the database and its corresponding image (if applicable)
    # def delete_listing(self, listing):
    #     imageId = listing["image"]
    #     if imageId:
    #         self.db_delete(self.db_images, imageId)
    #     self.db_remove(self.db_listings, listing)
    #     return

    # def create_user(self, username, email, hashed_password, salt):
    #     pass

    # def get_user(self, username):
    #     return self.db_users.find_one({"username": username})

    # def delete_user(self, user):
    #     pass

    # def user_is_admin(self, username):
    #     if self.db_admins.find_one({"username": username}):
    #         return True
    #     return False


class User(Model):
    # .env file should include a statmement MONGODB_URI=mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild
    """
        === General Format ===
        User: {
            username: str
            password: str
            salt: str
            email: str
            posts: list['listing_id']
            likes: list['listing_id']
            address: dict()
        }
    """


    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']

    db_client = MongoClient(MONGODB_URI)
    collection = db_client["users"]["users_list"]
    # db_admins = db_client["users"]["admin_list"]

    # def add(self):
    #     if not self._id:  # If not in db, add to db
    #         resp = self.collection.insert_one(self)
    #         self._id = str(self._id)
    #     else:  # If in db already, update item
    #         resp = self.collection.update_one(
    #             {"_id": ObjectId(self._id)}, self)
    #     self._id = str(self._id)
    #     return resp

    def get(self, username):
        user = self.collection.find_one({"username": username})
        return user

    def get_likes(self, username):
        user = self.collection.find_one({"username": username})
        return user['likes']

    def add_like(self, username, listing):
        user = self.collection.find_one({"username": username})
        likes = user['likes']
        likes.append(listing)
        self.collection.update_one({"username": username}, {"likes": likes})

    def is_admin(self, username):
        if self.db_admins.find_one({"username": username}):
            return True
        return False


class Listing(Model):
    # .env file should include a statmement MONGODB_URI=mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild
    """ 
        === General Format ===

        Listing: {
            price: float
            description: str
            categories: list[str]
            seller: str              <-(this will probably just be the sellers username)
            contact: str
            location: {
                state:
                zip:
            }
            images: list[image_url]
            time_posted: {}
        }
    """
    
    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    
    db_client = MongoClient(MONGODB_URI)
    listings = db_client["listings"]["listings"]
    collection = listings
    # db_images = db_client["listings"]["images"]

    #creates a listing with the given arguments, adds it to the database (and image if provided), then returns the listing.
    def add(self, listing):
        resp = self.listings.insert_one(listing)
        return resp.inserted_id

    #deletes the listing from the database and its corresponding image (if applicable)
    # def remove(self, listing):
    #     imageId = listing["image"]
    #     if imageId:
    #         self.db_delete(self.db_images, imageId)
    #     self.db_remove(self.db_listings, listing)
    #     return

    # Functions for searching by filters:

    def find_all(self):
        all_listings = self.listings.find()
        for listing in all_listings:
            listing["_id"] = str(listing["_id"])
        return all_listings
        
    # def find_by_categories(self, categories):
    #     filtered_listings = list(self.listings.find({"categories": {"$in": categories}}))
    #     return filtered_listings

    def find_by_category(self, category):
        filtered_listings = list(self.listings.find({"category":  category}))
        for listing in filtered_listings:
            listing["_id"] = str(listing["_id"])
        return filtered_listings
    
    def find_by_seller(self, seller):
        filtered_listings = list(self.listings.find({"seller": seller}))
        for listing in filtered_listings:
            listing["_id"] = str(listing["_id"])
        return filtered_listings

    def find_by_city(self, city):
        filtered_listings = list(self.listings.find({"location": {"city": city}}))
        for listing in filtered_listings:
            listing["_id"] = str(listing["_id"])
        return filtered_listings

    def find_by_state(self, state):
        filtered_listings = list(self.listings.find({"location": {"state": state}}))
        for listing in filtered_listings:
            listing["_id"] = str(listing["_id"])
        return filtered_listings

    def find_by_zip_code(self, zip_code):
        filtered_listings = list(self.listings.find({"location": {"zip": zip_code}}))
        for listing in filtered_listings:
            listing["_id"] = str(listing["_id"])
        return filtered_listings

    # def show_listings(self, filtered_listings, time_start, posts_per_page):
    #     show_listings = self.find
