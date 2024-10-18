from flask import Blueprint,request,jsonify
from app.scrapper import scrape
from app.summarize import summarize_reviews_in_chunks

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
    file_path = 'temp_files/reviews.txt'
    print(summarize_reviews_in_chunks(file_path=file_path))
    return "summarized"
    
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


