import os

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort, jsonify

from SparrowApp import app

@app.route('/signin')
def index():
    return "Yo, Sign In", 200

@app.route('/')
def view_of_test():
	return make_response(open('SparrowApp/templates/index.html').read())

# @app.route('/<model_name>/')
# @app.route('/<model_name>/<item_id>')
# def rest_pages(model_name, item_id=None):
#     if model_name in crud_url_models:
#         model_class = crud_url_models[model_name]
#         if item_id is None or session.query(exists().where(
#                 model_class.id == item_id)).scalar():
#             return make_response(open(
#                 'SparrowApp/templates/index.html').read())
#     abort(404)

@app.route('/addProject/<info>', methods=['GET'])
def test(info):
    print("HEY tesST WORKS:  ", info)
    data = {"id": info, "title": info}
    # return "HEW TEST WORKS"+info
    return jsonify(data), 200

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'templates'),
                               'favicon.ico')

