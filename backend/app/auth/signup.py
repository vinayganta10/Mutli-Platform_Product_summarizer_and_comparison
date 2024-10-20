from flask import g,jsonify
from app.models import User

def Signup(data):
    collection = g.db['users']
    find = collection.find_one({"email":data['email']})
    if(find!=None):
        return jsonify({"message":"Email already exists"}),401
    newUser = User(data['username'],data['email'],data['password'])
    collection.insert_one(newUser.to_dict())
    return "user created"