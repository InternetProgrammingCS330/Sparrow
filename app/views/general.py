import os

from flask import Blueprint
from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

mod = Blueprint('player', __name__)

@mod.route('/signin')
def index():
    return "Yo, Sign In", 200

@mod.route('/')
def view_of_test():
	return make_response(open('public/index.html').read())