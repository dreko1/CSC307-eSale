import bcrypt as b

# we will need to store username, hashed password, and the salt used to hash in the database

# this method will need to be called by the method the queries the database
def validate_password(pw):
    hashed_password = b.hashpw(b'test', b.gensalt())
    if b.checkpw(pw,hashed_password):
        # pass
        return 0
    # fail
    return 1 

validate_password(b'test')
validate_password(b'fail test')