from flask import Blueprint

mod = Blueprint('player', __name__)

@mod.route('/')
def index():
    return "hello world", 200

@mod.route('/signin')
def view_of_test():
    hiT = "sudo make me a sandwhich"
    return "sudo make me a sandwhich"