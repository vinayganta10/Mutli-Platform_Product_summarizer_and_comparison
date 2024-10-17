from flask import Blueprint,request,jsonify
from app.scrapper import scrape
from backend.app.summarize import summarize_reviews_in_chunks

bp = Blueprint("pages",__name__)

@bp.route('/')
def home():
    return "sample"

@bp.route('/signup')
def signup():
    return "signup"

@bp.route('/login')
def login():
    return "login"

@bp.route('/summarizer')
def summarizer():
    summarize_reviews_in_chunks()
    

@bp.route('/scrapper',methods=['POST'])
def scrapper():
    data = request.get_json()
    url = data['url']
    if scrape(url)==-1:
        raise Exception("Could not scrape")
    return "scrapped"

@bp.route('/sentiment')
def sentiment():
    return "sentiment"

@bp.route('/comparison')
def comparison():
    return "comparison"


