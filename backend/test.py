from bson.objectid import ObjectId
import pytest
from model import Model, User, Listing
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import random


Listing.collection = Model.db_client['test']['listings']
User.collection = Model.db_client['test']['users']

def test_save():
    entry = Model({'test_save': 'saving'})
    entry.save()
    assert entry._id

def test_reload():
    entry = Model({'test_reload': 'reloading'})
    entry.save()
    entry.save()
    assert entry['test_reload'] == 'reloading'
    entry['test_reload'] = 'no'
    assert entry['test_reload'] == 'no'
    entry.reload()
    assert entry['test_reload'] == 'reloading'

def test_remove():
    entry = Model({'test_remove': 'removing'})
    entry.save()
    result = entry.remove()
    assert result.deleted_count == 1

def test_update():
    entry = Model({'test_update': 'updating'})
    entry.save()
    assert entry['test_update'] == 'updating'
    entry['test_update'] = 'done testing update'
    assert entry['test_update'] == 'done testing update'
    entry.update()
    assert entry['test_update'] == 'done testing update'


def test_user_get_and_verify():
    defaultUser = User.get("default_user")
    alsoDefaultUser = User.get('default_user')
    print(defaultUser)
    print(alsoDefaultUser)
    assert defaultUser['_id'] == alsoDefaultUser['_id']
    #assert not defaultUser.verify_credentials("not_password")
    #assert defaultUser.verify_credentials("default_password")

def test_new_user():
    name = "botUser"+str(random.randint(0, 1000000))
    user = User.new_user(name, "password", "bot@esale.com")
    assert user.username == name
    user = User.new_user(name, "password2", "bot2@esale.com")
    assert user == None

def test_verify_credentials():
    defaultUser = User.get("default_user")
    print(defaultUser['password'])
    assert defaultUser.verify_credentials("default_password")

def test_listing_new():
    user = User.get("default_user")
    listingTitle = 'listing '+str(random.randint(0, 10000000000))
    listing = Listing.new_listing(user, listingTitle, 20, 'description', 'category', 'contact')
    assert listing['_id']

def test_listing_set_location():
    listing = Listing({'_id': ObjectId("60ae95468b08c747153d33aa")}).reload()
    randCity = str(random.randint(0, 10000000000))
    randState = str(random.randint(0, 10000000000))
    randZip = str(random.randint(0, 10000000000))
    listing.set_location(randCity, randState, randZip)
    assert listing['location'] == {
        'city': randCity,
        'state': randState,
        'zip': randZip
    }

def test_listing_set_image():
    listing = Listing({'_id': ObjectId("60ae95468b08c747153d33aa")}).reload()
    randString = str(random.randint(0, 10000000000))
    listing.set_image(randString)
    listing.reload()
    assert listing['image'] == randString

def test_listing_find():
    assert list(Listing.find_by_category('Boats')) == []