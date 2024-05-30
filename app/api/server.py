from flask import Blueprint
from flask_login import login_required
from app.models import Server, db

server = Blueprint("servers", __name__, url_prefix="")

@server.route("/")
# @login_required
def index():
    print("HELLO SERVERS")
    servers = Server.query.all()
    print([server.to_dict() for server in servers])
    return [server.to_dict() for server in servers]