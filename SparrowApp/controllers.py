import os
import datetime
import time
import json
from wsgiref.handlers import format_date_time

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort, jsonify

from SparrowApp import app, db, models

@app.after_request
def add_header(response):
	response.cache_control.max_age = 0
	now = datetime.datetime.now()
	expires_time = now + datetime.timedelta(seconds=1)
	response.headers['Cache-Control'] = 'public'
	response.headers['Expires'] = format_date_time(time.mktime(expires_time.timetuple()))
	return response

@app.route('/signin')
def index():
	return "Yo, Sign In", 200

@app.route('/')
def view_of_test():
	response = make_response(open('SparrowApp/templates/index.html').read())
	response.cache_control.max_age = 0
	now = datetime.datetime.now()
	expires_time = now + datetime.timedelta(seconds=1)
	response.headers['Cache-Control'] = 'public'
	response.headers['Expires'] = format_date_time(time.mktime(expires_time.timetuple()))
	return response

# @app.route('/<model_name>/')
# @app.route('/<model_name>/<item_id>')
# def rest_pages(model_name, item_id=None):
# 	if model_name in crud_url_models:
# 		model_class = crud_url_models[model_name]
# 		if item_id is None or session.query(exists().where(model_class.id == item_id)).scalar():
# 			response = make_response(open('SparrowApp/templates/index.html').read())
# 			response.cache_control.max_age = 0
# 			return response
# 	abort(404)

@app.route('/listAllProjects', methods=['GET'])
def listAllProjects():
	projects = models.ProjectDB.query.all()
	reslist = []
	for i in projects:
		reslist.append(dict(title=i.title,description=i.description,email=i.email))
	return jsonify(list=reslist), 200

@app.route('/addProject', methods=['POST'])
def addProject():
	req = request.get_json()

	project = models.ProjectDB(title=req["title"], description=req["description"],email=req["email"])
	db.session.add(project)
	db.session.commit()
	
	projects = models.ProjectDB.query.all()
	reslist = []
	for i in projects:
		reslist.append(dict(title=i.title,description=i.description, email=i.email))
		print (reslist)

	return jsonify(list=reslist), 200

@app.route('/checkUser', methods=['POST'])
def checkUser():
	req = request.get_json()

	print("USER REQUEST", req)

	userStatus = models.UserDB.query.filter_by(email=req["email"])
	userList = []
	for i in userStatus:
		userList.append(dict(email=i.email,profile_picture=i.profile_picture))

	if len(userList) == 0:
		user = models.UserDB(email=req["email"], first_name=req["firstName"],last_name=req["lastName"],profile_picture=req["profpic"])
		db.session.add(user)
		db.session.commit()

		return jsonify(title="userADDED"), 200

	else:
		if userList[0]["profile_picture"] != req["profpic"]:
			# db.session.query().filter(UserDB.email == req["email"]).update(UserDB,values={"UserDB.profile_picture": req["profpic"]})
			models.UserDB.query.filter_by(email=req["email"]).update({models.UserDB.profile_picture: req["profpic"]})
			db.session.commit()
			return jsonify(title="userEXISTS, ProfPic UPDATED"), 200
		else:
			return jsonify(title="userEXISTS"), 200

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'templates'),
							   'favicon.ico')

