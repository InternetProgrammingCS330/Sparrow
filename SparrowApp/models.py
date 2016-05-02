from SparrowApp import db
from sqlalchemy.sql import text, func

from sqlalchemy.dialects.mysql import \
		BIGINT, BINARY, BIT, BLOB, BOOLEAN, CHAR, DATE, \
		DATETIME, DECIMAL, DECIMAL, DOUBLE, ENUM, FLOAT, INTEGER, \
		LONGBLOB, LONGTEXT, MEDIUMBLOB, MEDIUMINT, MEDIUMTEXT, NCHAR, \
		NUMERIC, NVARCHAR, REAL, SET, SMALLINT, TEXT, TIME, TIMESTAMP, \
		TINYBLOB, TINYINT, TINYTEXT, VARBINARY, VARCHAR, YEAR

class UserDB(db.Model):
	email = db.Column(VARCHAR(30), primary_key=True, nullable=False)
	first_name = db.Column(VARCHAR(30), nullable=False)
	last_name = db.Column(VARCHAR(30), nullable=False)
	profile_picture = db.Column(VARCHAR(200))
	department_preference =db.Column(LONGTEXT)

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class ProjectDB(db.Model):
	projectID = db.Column(INTEGER, primary_key=True)
	title = db.Column(VARCHAR(20), index=True)
	description = db.Column(LONGTEXT, nullable=False)
	keywords = db.Column(VARCHAR(100))
	email = db.Column(VARCHAR(30), nullable=False)
	time_stamp = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CommentsDB(db.Model):
	commentID = db.Column(INTEGER, nullable=False, primary_key=True, autoincrement=False)
	projectID = db.Column(INTEGER, nullable=False)
	email = db.Column(VARCHAR(30), nullable=False)
	comment = db.Column(LONGTEXT, nullable=False)
	time_stamp = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class InterestDB(db.Model):
	projectID = db.Column(INTEGER, nullable=False, primary_key=True, index=True, unique=True)
	email = db.Column(VARCHAR(30), nullable=False, primary_key=True, index=True, unique=True)

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class DepartmentDB(db.Model):
	departmentID= db.Column(INTEGER, nullable=False, primary_key=True, autoincrement=True)
	department_name= db.Column(VARCHAR(30))

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

