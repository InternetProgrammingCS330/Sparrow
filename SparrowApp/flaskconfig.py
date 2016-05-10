DEBUG = True

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URI = 'postgres://ckkqkjuuyafdke:_vraBcR3QzNTi_vB29Qh2BTTZy@ec2-54-235-65-221.compute-1.amazonaws.com:5432/dag3g9f4jatcur'
SQLALCHEMY_TRACK_MODIFICATIONS = False
DATABASE_CONNECT_OPTIONS = {}

THREADS_PER_PAGE = 2

CSRF_ENABLED     = True

CSRF_SESSION_KEY = "secret"

SECRET_KEY = "secret"