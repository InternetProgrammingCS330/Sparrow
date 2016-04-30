from flask import Flask, request, Blueprint, render_template, \
                  flash, g, session, redirect, url_for

# Initialize the App

app = Flask(__name__)
app.config.from_object('flaskconfig')

@app.errorhandler(404)
def not_found(error):
    return "404 error", 404

@app.errorhandler(401)
def not_found(error):
    return "Not Authenticated", 401

mod = Blueprint('player', __name__)

#These are the routes

@mod.route('/')
def index():
    return "hello world", 200

@mod.route('/signin')
def view_of_test():
    hiT = "sudo make me a sandwhich"
    return "sudo make me a sandwhich"

app.register_blueprint(mod) # Why are we required to register this blueprint?