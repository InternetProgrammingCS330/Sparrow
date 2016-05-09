import os
import datetime
import time
import json
from wsgiref.handlers import format_date_time

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort, jsonify

from sqlalchemy import text

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
	query = db.engine.execute(text("Select email,first_name,last_name, profile_picture from UserDB"))
	users = {}
	for row in query:
		users[row[0]] = (row[1],row[2],row[3])
	
	for i in projects:
		reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
			first_name=users[i.email][0], last_name=users[i.email][1], profile_picture=users[i.email][2]))

	return jsonify(list=reslist), 200

@app.route('/listUserProjects', methods=['POST'])
def listUserProjects():

	req = request.get_json()

	print("USER REQUEST", req)

	projects = models.ProjectDB.query.all()
	reslist = []
	query = db.engine.execute(text("Select email,first_name,last_name, profile_picture from UserDB WHERE email = '"+req+"'"))
	users = {}
	for row in query:
		users[row[0]] = (row[1],row[2],row[3])
	
	for i in query:
		reslist.append(dict(title=i.title,description=i.description,department=i.department,time_stamp=i.time_stamp))
	
	reslistCounts = []
	userProjectCounts = db.engine.execute(text("SELECT DATE(time_stamp) time_stamp, COUNT(DISTINCT projectID) totalCount FROM ProjectDB WHERE email = '"+req+"' GROUP BY DATE(time_stamp)"))
	for row in userProjectCounts:
		reslistCounts.append(dict(time=row.time_stamp.isoformat(),count=row.totalCount))

	totalCount = []
	userProjectCounts = db.engine.execute(text("SELECT COUNT(DISTINCT projectID) totalCount FROM ProjectDB WHERE email = '"+req+"'"))
	for row in userProjectCounts:
		totalCount.append(dict(totalCount=row.totalCount))

	# reslist.append({"length":len(reslist)})
	return jsonify(list=reslist,counts=reslistCounts,total=totalCount), 200

@app.route('/listDepartments', methods=['GET'])
def listDepartments():
	departments = models.DepartmentDB.query.all()
	reslist = []
	for i in departments:
		reslist.append(dict(department_name=i.department_name))
	return jsonify(list=reslist), 200

@app.route('/getTotalGraph', methods=['GET'])
def getTotalGraph():
	departments = models.ProjectDB.query.all()
	reslist = []
	query = db.engine.execute(text("SELECT DATE(time_stamp) time_stamp, COUNT(DISTINCT projectID) totalCount FROM ProjectDB GROUP BY  DATE(time_stamp)"))
	for row in query:
		reslist.append(dict(time=row.time_stamp.isoformat(),count=row.totalCount))
	print(reslist)
	print(type(reslist))
	return jsonify(list=reslist), 200

@app.route('/showProject', methods=['POST'])
def showProject():
	req = request.get_json()
	
	project = db.engine.execute(text("SELECT * FROM ProjectDB WHERE projectID = " + str(req)))
	
	query = db.engine.execute(text("Select email,first_name,last_name, profile_picture from UserDB"))
	users = {}
	for row in query:
		users[row[0]] = (row[1],row[2],row[3])

	reslist = []
	for i in project:
		reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
			first_name=users[i.email][0], last_name=users[i.email][1], profile_picture=users[i.email][2]))
	
	return jsonify(list=reslist), 200

@app.route('/addProject', methods=['POST'])
def addProject():
	req = request.get_json()

	project = models.ProjectDB(title=req["title"], description=req["description"],email=req["email"],department=req["department"])
	db.session.add(project)
	db.session.commit()
	
	projects = models.ProjectDB.query.all()
	reslist = []
	for i in projects:
		reslist.append(dict(title=i.title,description=i.description, email=i.email, time_stamp=i.time_stamp))
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