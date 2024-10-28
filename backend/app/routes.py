from flask import Blueprint,request,jsonify,g
from .services.scrapper import scrape
from .services.sentiment import analyze
from .services.summarize import summarize_reviews_in_chunks
from .services.compare import compare
import json
import os
from .auth.login import Login
from .auth.signup import Signup
from app.models import User
from app.auth.profile import Profile
from .auth.update import Update
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

@bp.route('/profile',methods=['PUT'])
def update_profile():
    data = request.get_json()
    return Update(data)

@bp.route('/getProfile',methods=['POST'])
def get_profile():
    data=request.get_json()
    return Profile(data)

@bp.route('/summarizer',methods=['GET'])
#@token_required
def summarizer():
    file_path = 'temp_files/reviews.txt'
    summary = summarize_reviews_in_chunks(file_path=file_path)
    return jsonify({"summary":summary}),200

@bp.route('/scrapper',methods=['POST'])
#@token_required
def scrapper():
    data = request.get_json()
    url = data['url']
    if scrape(url)==-1:
        raise Exception("Could not scrape")
    file_path = os.path.join('temp_files', 'data.json')
    with open(file_path, 'r',encoding='utf-8') as file:
        scraped_data = json.load(file)
    
    return scraped_data
    #return "scrapped"

@bp.route('/sentiment',methods=['POST'])
#@token_required
def sentiment():
    data = request.get_json()
    url = data['url']
    return jsonify(analyze(url))

@bp.route('/compare',methods=['POST'])
#@token_required
def comparison():
    req = request.get_json()
    data = compare(req['name'],req['platform'])
    return jsonify({"compare":data}),200


