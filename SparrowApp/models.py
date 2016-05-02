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
	commentID = db.Column(INTEGER, nullable=False, primary_key=True)
	time_stamp = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
	projectID = db.Column(INT, nullable=False)
	email = db.Column(varchar(30), nullable=False)
	comment = db.Column(LONGTEXT, nullable=False)

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

# class CommentsDB(db.Model):
# 	commentID = db.Column(INTEGER, nullable=False, primary_key=True)
# 	time_stamp = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
# 	projectID = db.Column(INT, nullable=False)
# 	email = db.Column(varchar(30), nullable=False)
# 	comment = db.Column(LONGTEXT, nullable=False)

# 	def __repr__(self):
# 		# return '<Project %r>' % (self.title)
# 		# formats/manually creates the JSON object
		# return {c.name: getattr(self, c.name) for c in self.__table__.columns}
# 	email varchar(30) NOT NULL,
# 	projectID INT NOT NULL,
# 	UNIQUE INDEX (email,projectID),
# 	PRIMARY KEY (email, projectID),
# 	FOREIGN KEY (email) REFERENCES userDB(email),
# 	FOREIGN KEY (projectID) REFERENCES projectDB(projectID)


# CREATE TABLE interestDB (
# 	email varchar(30) NOT NULL,
# 	projectID INT NOT NULL,
# 	UNIQUE INDEX (email,projectID),
# 	PRIMARY KEY (email, projectID),
# 	FOREIGN KEY (email) REFERENCES userDB(email),
# 	FOREIGN KEY (projectID) REFERENCES projectDB(projectID)
# 	) ENGINE=InnoDB;

# CREATE TABLE departmentDB (
# 	departmentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
# 	department_name varchar(30)
# 	) ENGINE=InnoDB;

# USE sergeidb;

# source populateTables.sql;
