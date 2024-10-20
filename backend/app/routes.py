from flask import Blueprint,request,jsonify,g
from .services.scrapper import scrape
from .services.summarize import summarize_reviews_in_chunks
import json
import os
from .auth.login import Login
from .auth.signup import Signup
from app.models import User
from .auth.verify import token_required

bp = Blueprint("pages",__name__)

@bp.route('/')
@token_required
def home():
    return "sample"

@bp.route('/signup',methods=['POST'])
def signup():
    data = request.get_json()
    return Signup(data)

@bp.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    return Login(data)

@bp.route('/profile',methods=['GET','POST'])
@token_required
def update_profile():
    pass

@bp.route('/summarizer',methods=['GET'])
@token_required
def summarizer():
    file_path = 'temp_files/reviews.txt'
    print(summarize_reviews_in_chunks(file_path=file_path))
    return "summarized"
    
@bp.route('/scrapper',methods=['POST'])
@token_required
def scrapper():
    data = request.get_json()
    url = data['url']
    if scrape(url)==-1:
        raise Exception("Could not scrape")
    file_path = os.path.join('temp_files', 'data.json')
    with open(file_path, 'r',encoding='utf-8') as file:
        scraped_data = json.load(file)
    
    return scraped_data

@bp.route('/sentiment')
def sentiment():
    return "sentiment"

@bp.route('/comparison')
def comparison():
    return "comparison"


