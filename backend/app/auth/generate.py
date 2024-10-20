import jwt
from datetime import datetime, timedelta,timezone

SECRET_KEY = 'secret_key'

def generate_token(user):
    payload = {
        'email': str(user['email']),
        'password': user['password'],
        'exp': datetime.now(timezone.utc) + timedelta(hours=2)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token
