from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
# enables CORS support on all routes, for all origins and methods
CORS(app)