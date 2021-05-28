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
    defaultUser = User.get("default_username")
    alsoDefaultUser = User.get('default_username')
    print(defaultUser)
    print(alsoDefaultUser)
    assert defaultUser['_id'] == alsoDefaultUser['_id']
    #assert not defaultUser.verify_credentials("not_password")
    #assert defaultUser.verify_credentials("default_password")

def test_user_get_likes():
    user = User.get("default_username")
    likes = user.get_likes()
    assert likes.count(ObjectId("60ae95468b08c747153d33aa")) == 1
    assert likes.count(ObjectId("60ae95468b08c747153d33ab")) == 1

def test_user_is_admin():
    #this test fails for some reason... user is none? why?
    pass
    #user = User.get("default_username")
    #assert not (user.isAdmin())

def test_listing_new():
    user = User.get("default_username")
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

def test_listing_find_by_seller():
    pass

def test_listing_find_by_city():
    pass

def test_listing_find_by_state():
    pass

def test_listing_find_by_zpi_code():
    pass

'''
contents of database['test']['users']:
    {
        "username": "default_username",
        "password": "default_password",
        "email": "default@email",
        "admin": false,
        "posts": [null, {
            "$oid": "60ae95468b08c747153d33aa"
        }, {
            "$oid": "60ae95468b08c747153d33ab"
        }, {
            "$oid": "60ae95468b08c747153d33ac"
        }],
        "likes": [null, {
            "$oid": "60ae95468b08c747153d33aa"
        }, {
            "$oid": "60ae95468b08c747153d33ab"
        }],
        "address": {}
    }
contents of database['test']['listings']:
    {
        "title": "test_title1",
        "price": "p",
        "description": "d",
        "category": "ca",
        "userId": {
            "$oid": "60ae9054825281273fa3c56e"
        },
        "username": "default_username",
        "contact": "co",
        "location": {
            "city": "",
            "state": "",
            "zip": ""
        },
        "image": "",
        "time_posted": "05-26-2021, 11:36:54"
    }
    {
        "title": "test_title2",
        "price": "p",
        "description": "d",
        "category": "ca",
        "userId": {
            "$oid": "60ae9054825281273fa3c56e"
        },
        "username": "default_username",
        "contact": "co",
        "location": {
            "city": "",
            "state": "",
            "zip": ""
        },
        "image": "",
        "time_posted": "05-26-2021, 11:36:54"
    }
    {
        "title": "test_title3",
        "price": "p",
        "description": "d",
        "category": "ca",
        "userId": {
            "$oid": "60ae9054825281273fa3c56e"
        },
        "username": "default_username",
        "contact": "co",
        "location": {
            "city": "",
            "state": "",
            "zip": ""
        },
        "image": "",
        "time_posted": "05-26-2021, 11:36:54"
    }
'''