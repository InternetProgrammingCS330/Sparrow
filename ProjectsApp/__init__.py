from flask import Flask, request, Blueprint

app = Flask(__name__)
app.config.from_object('flaskconfig')

@app.errorhandler(404)
def not_found(error):
    return "404 error", 404

from SparrowApp.views import general
app.register_blueprint(general.mod)
