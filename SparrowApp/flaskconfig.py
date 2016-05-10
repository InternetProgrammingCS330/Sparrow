DEBUG = True

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://master:qwerty@localhost/sergeidb?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = False
DATABASE_CONNECT_OPTIONS = {}

THREADS_PER_PAGE = 2

CSRF_ENABLED     = True

CSRF_SESSION_KEY = "secret"

SECRET_KEY = "secret"