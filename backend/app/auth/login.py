from flask import g,jsonify
from .generate import generate_token

def Login(data):
    collection = g.db['users']
    email = data['email']
    find = collection.find_one({'email':email})
    if find==None:
        return jsonify({"message":"user not found"}),404
    else:
        if find['password']!=data['password']:
            return jsonify({"message":"password incorrect"}),401
        token = generate_token(data)
        return jsonify({"message":"login successful","token":token}),200