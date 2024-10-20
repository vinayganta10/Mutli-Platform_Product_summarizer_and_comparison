from flask import g,jsonify
from app.models import User


def Update(data):
    collection = g.db['users']
    collection.update_one(
        {'email': data['email']},
        {'$set': {'username': data['username']}}
    )
    return jsonify({"message":"Profile updated successfully"}),200
