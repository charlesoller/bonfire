from flask import Blueprint
from flask_login import login_required
from app.models import Server, db, Channel

server = Blueprint("servers", __name__, url_prefix="")

@server.route("/")
# @login_required
def get_all_servers():
    print("HELLO SERVERS")
    servers = Server.query.all()
    print([server.to_dict() for server in servers])
    return [server.to_dict() for server in servers]

@server.route("/<int:server_id>/channels")
# @login_required
def get_all_server_channels(server_id):
    print("HELLO CHANNELS")
    channels = Channel.query.filter_by(server_id=server_id).all()
    print([channel.to_dict() for channel in channels])
    return [channel.to_dict() for channel in channels]