from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Server, db, Channel, ServerImage
from app.forms import NewServerForm

server = Blueprint("servers", __name__, url_prefix="")

@server.route("/")
# @login_required
def get_all_servers():
    print("HELLO SERVERS")
    servers = Server.query.all()
    print([server.to_dict() for server in servers])
    return [server.to_dict() for server in servers]

@server.route("/", methods=["POST"])
@login_required
def create_new_server():
    form = NewServerForm()
    print(form)
    if form.validate_on_submit():
        print("HELLO SERVERS POST")
        server_name = form.name.data
        server_description = form.description.data
        server_image = form.server_image.data
        user_id = current_user.id
        
        new_server = Server(
            name = server_name,
            description = server_description,
            owner_id = user_id
        )

        db.session.add(new_server)
        db.session.commit()

        new_server_image = ServerImage(
            url = server_image,
            server_id = new_server.id
        )

        db.session.add(new_server_image)
        db.session.commit()
        
        results = db.session.query(Server, ServerImage).join(ServerImage, ServerImage.server_id == Server.id).filter(Server.id == new_server.id).all()
        print("RESULTS", results)
        server_data = []
        for server, server_image in results:
            server_dict = server.to_dict()
            server_dict['server_image'] = server_image.to_dict()
            server_data.append(server_dict)

            return server_data
    else:
        return form.errors, 401

@server.route("/<int:server_id>/channels")
# @login_required
def get_all_server_channels(server_id):
    print("HELLO CHANNELS")
    channels = Channel.query.filter_by(server_id=server_id).all()
    print([channel.to_dict() for channel in channels])
    return [channel.to_dict() for channel in channels]