import os
import datetime
import time
import json
from wsgiref.handlers import format_date_time

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort, jsonify

from sqlalchemy import text, func

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

@app.route('/listAllProjects', methods=['POST'])
def listAllProjects():
	req = request.get_json()
	reslist = []
	query = db.engine.execute(text("""SELECT
	"ProjectDB"."projectID","ProjectDB"."title","ProjectDB"."description", 
	"ProjectDB"."department", "ProjectDB"."time_stamp", "UserDB"."email", 
	"UserDB"."first_name","UserDB"."last_name",	"UserDB"."profile_picture", 
	( select count("InterestDB"."email") from "InterestDB" where 
		"InterestDB"."projectID" = "ProjectDB"."projectID") count,
	 MAX(CASE WHEN "InterestDB"."email" = '"""+req+"""' THEN 1 ELSE 0 END) as liked FROM "UserDB", 
"ProjectDB" LEFT JOIN "InterestDB" ON ("ProjectDB"."projectID" = "InterestDB"."projectID") 
where "ProjectDB"."email" = "UserDB"."email" GROUP BY "ProjectDB"."projectID", "UserDB"."email";"""))
	
	for i in query:
		if(i.liked == 0):
			reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
				first_name=i.first_name, last_name=i.last_name, profile_picture=i.profile_picture, count=i.count,liked=False))
		else:
			reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
				first_name=i.first_name, last_name=i.last_name, profile_picture=i.profile_picture, count=i.count,liked=True))

	allDepartmentProjectCountGraph = []
	allDepartmentProjectCountGraphCounts = db.engine.execute(text("""SELECT "ProjectDB"."department", \
		COUNT("ProjectDB"."projectID") as "projectCount" FROM "ProjectDB" GROUP BY "ProjectDB"."department";"""))
	for row in allDepartmentProjectCountGraphCounts:
		allDepartmentProjectCountGraph.append(dict(department=row.department,likes=row.projectCount))

	return jsonify(list=reslist,allDepartmentProjectCountGraph=allDepartmentProjectCountGraph), 200

@app.route('/listUserProjects', methods=['POST'])
def listUserProjects():

	req = request.get_json()

	yourProjectList = []
	test = db.engine.execute(text("""Select "ProjectDB"."projectID","ProjectDB"."title","ProjectDB"."description","ProjectDB"."department", \
	"ProjectDB"."time_stamp", "UserDB"."email", "UserDB"."first_name","UserDB"."last_name","UserDB"."profile_picture" \
	from "ProjectDB", "UserDB" WHERE "ProjectDB"."email" = "UserDB"."email" AND "ProjectDB"."email" = '"""+req+"""';"""))	
	for i in test:
		yourProjectList.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,time_stamp=i.time_stamp,email=i.email,first_name=i.first_name,last_name=i.last_name,profile_picture=i.profile_picture ))
	
	yourInterestList = []
	test = db.engine.execute(text("""Select "ProjectDB"."title","ProjectDB"."description","ProjectDB"."department", \
	"ProjectDB"."time_stamp", "UserDB"."email", "UserDB"."first_name","UserDB"."last_name","UserDB"."profile_picture" \
	from "ProjectDB", "UserDB", "InterestDB" WHERE "ProjectDB"."email"="UserDB"."email" AND \
	"ProjectDB"."projectID" = "InterestDB"."projectID" AND "InterestDB"."email" = '"""+req+"""';"""))	
	for i in test:
		yourInterestList.append(dict(title=i.title,description=i.description,department=i.department,time_stamp=i.time_stamp,email=i.email,first_name=i.first_name,last_name=i.last_name,profile_picture=i.profile_picture ))


	reslistCounts = []
	userProjectCounts = db.engine.execute(text("""SELECT DATE("time_stamp") time_stamp, \
		COUNT("projectID") as "yourProjectsCount" FROM "ProjectDB" WHERE "email" = '"""+req+"""' \
		GROUP BY DATE("time_stamp");"""))
	for row in userProjectCounts:
		reslistCounts.append(dict(time=row.time_stamp.isoformat(),count=row.yourProjectsCount))

	yourProjectLikes = []
	projectsLikesCounts = db.engine.execute(text("""SELECT "ProjectDB"."title", "ProjectDB"."projectID", \
		COUNT("InterestDB"."email") \
		as "yourLikes" FROM "ProjectDB","InterestDB" WHERE "ProjectDB"."projectID"="InterestDB"."projectID" AND \
		"ProjectDB"."email" = '"""+req+"""' GROUP BY "ProjectDB"."projectID";"""))
	for row in projectsLikesCounts:
		yourProjectLikes.append(dict(title=row.title,countLikes=row.yourLikes))

	youGaveLikes = []
	projectsLikesCounts = db.engine.execute(text("""SELECT "ProjectDB"."title", "ProjectDB"."projectID", \
		COUNT("InterestDB"."email") \
		as "yourLikes" FROM "ProjectDB","InterestDB" WHERE "ProjectDB"."projectID"="InterestDB"."projectID" AND \
		"ProjectDB"."email" = '"""+req+"""' GROUP BY "ProjectDB"."projectID";"""))
	for row in projectsLikesCounts:
		youGaveLikes.append(dict(title=row.title,countLikes=row.yourLikes))

	yourProjectsCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "yourProjectsCount" \
		FROM "ProjectDB" WHERE "email" = '"""+req+"""';"""))
	for row in userProjectCounts:
		yourProjectsCount.append(dict(yourProjectsCount=row.yourProjectsCount))

	yourInterestsCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "yourInterestsCount" \
		FROM "InterestDB" WHERE "email" = '"""+req+"""';"""))
	for row in userProjectCounts:
		yourInterestsCount.append(dict(yourInterestsCount=row.yourInterestsCount))

	totalCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "totalCount" \
		FROM "ProjectDB" WHERE "email" = '"""+req+"""';"""))
	for row in userProjectCounts:
		totalCount.append(dict(totalCount=row.totalCount))

	departmentLikeGraph = []
	departmentLikeGraphCounts = db.engine.execute(text("""SELECT "department", COUNT("projectID") as "projectCount" \
	FROM "ProjectDB" WHERE "email" = '"""+req+"""' GROUP BY "department";"""))
	for row in departmentLikeGraphCounts:
		departmentLikeGraph.append(dict(department=row.department,likes=row.projectCount))

	peopleLikeYourProjectsGraph = []
	peopleLikeYourProjectsGraphCounts = db.engine.execute(text("""SELECT "department", \
		COUNT(DISTINCT "InterestDB"."email") as "likeCount" FROM "ProjectDB", "InterestDB" \
		WHERE "ProjectDB"."projectID" = "InterestDB"."projectID" and \
		"ProjectDB"."email" = '"""+req+"""' GROUP BY "department";"""))
	for row in peopleLikeYourProjectsGraphCounts:
		peopleLikeYourProjectsGraph.append(dict(department=row.department,likes=row.likeCount))

	return jsonify(yourProjectList=yourProjectList,yourInterestList=yourInterestList,\
		yourProjectCounts=reslistCounts,yourProjectsTotal=yourProjectsCount,\
		yourInterestsTotal=yourInterestsCount,total=totalCount, \
		yourProjectLikes=yourProjectLikes,departmentLikeGraph=departmentLikeGraph,\
		peopleLikeYourProjectsGraph=peopleLikeYourProjectsGraph), 200

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
	query = db.engine.execute(text("""SELECT DATE("time_stamp") time_stamp, COUNT(DISTINCT "projectID") \
		as "totalCount" FROM "ProjectDB" GROUP BY  DATE("time_stamp");"""))
	for row in query:
		reslist.append(dict(time=row.time_stamp.isoformat(),count=row.totalCount))
	return jsonify(list=reslist), 200

@app.route('/showProject', methods=['POST'])
def showProject():
	req = request.get_json()
	
	project = db.engine.execute(text("""SELECT * FROM "ProjectDB" WHERE "projectID" = """ + str(req)))
	
	query = db.engine.execute(text("""Select "email","first_name","last_name", "profile_picture" from "UserDB";"""))
	users = {}
	for row in query:
		users[row[0]] = (row[1],row[2],row[3])

	reslist = []
	for i in project:
		reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,\
			department=i.department,email=i.email, time_stamp=i.time_stamp,\
			first_name=users[i.email][0], last_name=users[i.email][1],\
			profile_picture=users[i.email][2]))
	
	return jsonify(list=reslist), 200

@app.route('/addProject', methods=['POST'])
def addProject():
	req = request.get_json()
	keystring = ""
	for key in req["key"]:
		keystring += key + "@@@"
	keystring = keystring[:-3]


	project = models.ProjectDB(title=req["title"], description=req["description"],email=req["email"],department=req["department"],keywords=keystring)
	db.session.add(project)
	db.session.commit()
	
	projects = models.ProjectDB.query.all()
	reslist = []
	for i in projects:
		reslist.append(dict(title=i.title,description=i.description, email=i.email, time_stamp=i.time_stamp))

	return jsonify(list=reslist), 200

@app.route('/addLike', methods=['POST'])
def addLike():
	req = request.get_json()

	verificationList = []
	verification = db.engine.execute(text("""SELECT * FROM "InterestDB" WHERE "projectID" = """+str(req["projectID"]) + """ AND "email"='"""+req["email"]+"""';"""))
	for row in verification:
		verificationList.append(dict(count=row))

	if(len(verificationList)==0):
		like = models.InterestDB(projectID=req["projectID"], email=req["email"])
		db.session.add(like)
		db.session.commit()
	else:
		models.InterestDB.query.filter_by(projectID=req["projectID"],email=req["email"]).delete()
		db.session.commit()
	
	reslistCount = []
	likeCounts = db.engine.execute(text("""SELECT COUNT(DISTINCT "email") as "count" \
		FROM "InterestDB" WHERE	"projectID" = """+str(req["projectID"])))
	for row in likeCounts:
		reslistCount.append(dict(count=row.count))

	reslist = []
	query = db.engine.execute(text("""SELECT
	"ProjectDB"."projectID","ProjectDB"."title","ProjectDB"."description", 
	"ProjectDB"."department", "ProjectDB"."time_stamp", "UserDB"."email", 
	"UserDB"."first_name","UserDB"."last_name",	"UserDB"."profile_picture", 
	( select count("InterestDB"."email") from "InterestDB" where 
		"InterestDB"."projectID" = "ProjectDB"."projectID") count,
	 MAX(CASE WHEN "InterestDB"."email" = 'varaal01@luther.edu' THEN 1 ELSE 0 END) as liked FROM "UserDB", 
"ProjectDB" LEFT JOIN "InterestDB" ON ("ProjectDB"."projectID" = "InterestDB"."projectID") 
where "ProjectDB"."email" = "UserDB"."email" GROUP BY "ProjectDB"."projectID", "UserDB"."email";"""))
	
	for i in query:
		if(i.liked == 0):
			reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
				first_name=i.first_name, last_name=i.last_name, profile_picture=i.profile_picture, count=i.count,liked=False))
		else:
			reslist.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,email=i.email, time_stamp=i.time_stamp,\
				first_name=i.first_name, last_name=i.last_name, profile_picture=i.profile_picture, count=i.count,liked=True))

	return jsonify(count=reslistCount,list=reslist), 200

@app.route('/deleteUserProject', methods=['POST'])
def deleteUserProject():
	req = request.get_json()

	models.InterestDB.query.filter_by(projectID=req["projectID"]).delete()
	db.session.commit()
	models.ProjectDB.query.filter_by(projectID=req["projectID"]).delete()
	db.session.commit()
	
	yourProjectList = []
	test = db.engine.execute(text("""Select "ProjectDB"."projectID","ProjectDB"."title","ProjectDB"."description","ProjectDB"."department", \
	"ProjectDB"."time_stamp", "UserDB"."email", "UserDB"."first_name","UserDB"."last_name","UserDB"."profile_picture" \
	from "ProjectDB", "UserDB" WHERE "ProjectDB"."email" = "UserDB"."email" AND "ProjectDB"."email" = '"""+req['email']+"""';"""))	
	for i in test:
		yourProjectList.append(dict(projectID=i.projectID,title=i.title,description=i.description,department=i.department,time_stamp=i.time_stamp,email=i.email,first_name=i.first_name,last_name=i.last_name,profile_picture=i.profile_picture ))
	
	yourInterestList = []
	test = db.engine.execute(text("""Select "ProjectDB"."title","ProjectDB"."description","ProjectDB"."department", \
	"ProjectDB"."time_stamp", "UserDB"."email", "UserDB"."first_name","UserDB"."last_name","UserDB"."profile_picture" \
	from "ProjectDB", "UserDB", "InterestDB" WHERE "ProjectDB"."email"="UserDB"."email" AND \
	"ProjectDB"."projectID" = "InterestDB"."projectID" AND "InterestDB"."email" = '"""+req['email']+"""';"""))	
	for i in test:
		yourInterestList.append(dict(title=i.title,description=i.description,department=i.department,time_stamp=i.time_stamp,email=i.email,first_name=i.first_name,last_name=i.last_name,profile_picture=i.profile_picture ))


	reslistCounts = []
	userProjectCounts = db.engine.execute(text("""SELECT DATE("time_stamp") time_stamp, \
		COUNT("projectID") as "yourProjectsCount" FROM "ProjectDB" WHERE "email" = '"""+req['email']+"""' \
		GROUP BY DATE("time_stamp");"""))
	for row in userProjectCounts:
		reslistCounts.append(dict(time=row.time_stamp.isoformat(),count=row.yourProjectsCount))

	yourProjectLikes = []
	projectsLikesCounts = db.engine.execute(text("""SELECT "ProjectDB"."title", "ProjectDB"."projectID", \
		COUNT("InterestDB"."email") \
		as yourLikes FROM "ProjectDB","InterestDB" WHERE "ProjectDB"."projectID"="InterestDB"."projectID" AND \
		"ProjectDB"."email" = '"""+req['email']+"""' GROUP BY "ProjectDB"."projectID";"""))
	for row in projectsLikesCounts:
		yourProjectLikes.append(dict(title=row.title,countLikes=row.yourLikes))

	youGaveLikes = []
	projectsLikesCounts = db.engine.execute(text("""SELECT "ProjectDB"."title", "ProjectDB"."projectID", \
		COUNT("InterestDB"."email") \
		as yourLikes FROM "ProjectDB","InterestDB" WHERE "ProjectDB"."projectID"="InterestDB"."projectID" AND \
		"ProjectDB"."email" = '"""+req['email']+"""' GROUP BY "ProjectDB"."projectID";"""))
	for row in projectsLikesCounts:
		youGaveLikes.append(dict(title=row.title,countLikes=row.yourLikes))

	yourProjectsCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "yourProjectsCount" \
		FROM "ProjectDB" WHERE "email" = '"""+req['email']+"""';"""))
	for row in userProjectCounts:
		yourProjectsCount.append(dict(yourProjectsCount=row.yourProjectsCount))

	yourInterestsCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "yourInterestsCount" \
		FROM "InterestDB" WHERE "email" = '"""+req['email']+"""';"""))
	for row in userProjectCounts:
		yourInterestsCount.append(dict(yourInterestsCount=row.yourInterestsCount))

	totalCount = []
	userProjectCounts = db.engine.execute(text("""SELECT COUNT("projectID") as "totalCount" \
		FROM "ProjectDB" WHERE "email" = '"""+req['email']+"""';"""))
	for row in userProjectCounts:
		totalCount.append(dict(totalCount=row.totalCount))

	departmentLikeGraph = []
	departmentLikeGraphCounts = db.engine.execute(text("""SELECT "department", COUNT("projectID") as "projectCount" \
	FROM "ProjectDB" WHERE "email" = '"""+req['email']+"""' GROUP BY "department";"""))
	for row in departmentLikeGraphCounts:
		departmentLikeGraph.append(dict(department=row.department,likes=row.projectCount))

	peopleLikeYourProjectsGraph = []
	peopleLikeYourProjectsGraphCounts = db.engine.execute(text("""SELECT "department", \
		COUNT(DISTINCT "InterestDB"."email") as "likeCount" FROM "ProjectDB", "InterestDB" \
		WHERE "ProjectDB"."projectID" = "InterestDB"."projectID" and \
		"ProjectDB"."email" = '"""+req['email']+"""' GROUP BY "department";"""))
	for row in peopleLikeYourProjectsGraphCounts:
		peopleLikeYourProjectsGraph.append(dict(department=row.department,likes=row.likeCount))

	return jsonify(yourProjectList=yourProjectList,yourInterestList=yourInterestList,\
		yourProjectCounts=reslistCounts,yourProjectsTotal=yourProjectsCount,\
		yourInterestsTotal=yourInterestsCount,total=totalCount, \
		yourProjectLikes=yourProjectLikes,departmentLikeGraph=departmentLikeGraph,\
		peopleLikeYourProjectsGraph=peopleLikeYourProjectsGraph), 200

@app.route('/checkUser', methods=['POST'])
def checkUser():
	req = request.get_json()

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

@app.route('/getEdit', methods=['POST'])
def getEdit():
	req = request.get_json()
	projectQuery = models.ProjectDB.query.filter_by(projectID=req)
	project = []
	for i in projectQuery:
		project.append(dict(projectID=i.projectID,department=i.department,description=i.description,\
			title=i.title,keywords=i.keywords,time_stamp=i.time_stamp,email=i.email))
	return jsonify(project=project), 200

@app.route('/saveEdit', methods=['POST'])
def saveEdit():
	req = request.get_json()

	newDesc = req['description']

	models.ProjectDB.query.filter_by(projectID=req["projectID"]).update({models.ProjectDB.description: newDesc})
	db.session.commit()
	return jsonify(project="GOOD WORK"), 200

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
	return send_from_directory(os.path.join(app.root_path, 'templates'),
							   'favicon.ico')