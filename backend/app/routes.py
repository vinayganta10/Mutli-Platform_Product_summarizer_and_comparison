from flask import Blueprint

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
    return "summarization"

@bp.route('/scrapper')
def scrapper():
    return "scrapper"

@bp.route('/sentiment')
def sentiment():
    return "sentiment"

@bp.route('/comparison')
def comparison():
    return "comparison"


