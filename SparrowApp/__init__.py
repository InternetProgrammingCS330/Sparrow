#initializes the App

from flask import Flask, request, Blueprint, render_template, \
                  flash, g, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('SparrowApp.flaskconfig')
db = SQLAlchemy(app)

from SparrowApp import models

# db.drop_all()
db.create_all()

@app.errorhandler(404)
def not_found(error):
    return "404 error", 404

@app.errorhandler(401)
def not_found(error):
    return "Not Authenticated", 401

# from app.views import general

app.url_map.strict_slashes = False
import SparrowApp.controllers
