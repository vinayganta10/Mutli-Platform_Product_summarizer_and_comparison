from flask import Flask,g,jsonify
from app import routes
from flask_cors import CORS
from .mongoDB import MongoDB

def create_app():
    app = Flask(__name__)
    CORS(app)
    mongodb = MongoDB("mongodb+srv://aggvinayganta10:Vinay%40123@cluster1.j0j9p.mongodb.net/", "SAA")

    @app.before_request
    def before_request():
        mongodb.connect()
        g.db=mongodb.db

    # @app.teardown_appcontext
    # def teardown_db(exception):
    #     mongodb.close()
        

    app.register_blueprint(routes.bp)
    
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app