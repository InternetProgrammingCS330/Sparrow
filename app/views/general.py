from flask import Blueprint

mod = Blueprint('player', __name__)

@mod.route('/api')
def index():
    return "hello world", 200