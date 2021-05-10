import pymongo
from bson import ObjectId
# import dns from dnspython to yuse mongodb+srv URI
import dns
# import os to get env variables
import os
# import dotenv to hide Atlas Credentials
from dotenv import load_dotenv

class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    load_dotenv()  # take environment variables from .env.

    MONGODB_URI = os.environ['MONGODB_URI']

    db_client = pymongo.MongoClient(MONGODB_URI)
    # db name is 'users' and collection name is 'users_list'
    collection = db_client["users"]["users_list"]

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

    # .env file should include a statmement MONGODB_URI=mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild


    def find_by_username(self, username):
        users = list(self.collection.find({"username": username}))
        if len(users) == 1:
            return users[0]
        return None