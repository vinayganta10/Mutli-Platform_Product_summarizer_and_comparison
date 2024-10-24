from flask import g,jsonify

def Profile(data):
    collection = g.db['users']
    email = data['email']
    find = collection.find_one({'email':email})

    return jsonify({"username":find['username']}),200