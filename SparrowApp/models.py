from SparrowApp import db

class ProjectDB(db.Model):
    projectID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), index=True)
    description = db.Column(db.String(50))
    keywords = db.Column(db.String(100))

    def __repr__(self):
        # return '<Project %r>' % (self.title)
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}