from SparrowApp import db
from sqlalchemy.sql import text, func

from sqlalchemy.dialects.mysql import \
		BIGINT, BINARY, BIT, BLOB, BOOLEAN, CHAR, DATE, \
		DATETIME, DECIMAL, DECIMAL, DOUBLE, ENUM, FLOAT, INTEGER, \
		LONGBLOB, LONGTEXT, MEDIUMBLOB, MEDIUMINT, MEDIUMTEXT, NCHAR, \
		NUMERIC, NVARCHAR, REAL, SET, SMALLINT, TEXT, TIME, TIMESTAMP, \
		TINYBLOB, TINYINT, TINYTEXT, VARBINARY, VARCHAR, YEAR


class ProjectDB(db.Model):
	projectID = db.Column(INTEGER, primary_key=True)
	title = db.Column(VARCHAR(20), index=True)
	description = db.Column(LONGTEXT)
	keywords = db.Column(VARCHAR(100))
	email = db.Column(VARCHAR(30), nullable=False)
	time_stamp = db.Column(DATETIME, nullable=False, server_default=text('CURRENT_TIMESTAMP'))

	def __repr__(self):
		# return '<Project %r>' % (self.title)
		# formats/manually creates the JSON object
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# class projectDB(db.Model):
#     projectID = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(20), index=True)
#     description = db.Column(db.String(50))
#     keywords = db.Column(db.String(100))
#     email = db.Column(db.String(30))
#     # time_stamp = db.Column(db.DateTime, nullable=False, server_default=func.now())
#     time_stamp = db.Column(db.DateTime, nullable=False, server_default=text('CURRENT_TIMESTAMP'))


#     def __repr__(self):
#         # return '<Project %r>' % (self.title)
#         # formats/manually creates the JSON object
		# return {c.name: getattr(self, c.name) for c in self.__table__.columns}

# class userDB(db.Model):
#     email = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(20), index=True)
#     last_name = db.Column(db.String(50))
#     profile_picture = db.Column(db.String(100))
#     department_preference = db.Column(db.String(30))

#     def __repr__(self):
#         # return '<Project %r>' % (self.title)
#         # formats/manually creates the JSON object
#         return {c.name: getattr(self, c.name) for c in self.__table__.columns}