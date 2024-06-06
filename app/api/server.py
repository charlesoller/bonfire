from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server, db, Channel, ServerImage, User
from app.forms import NewServerForm, NewChannelForm

server = Blueprint("servers", __name__, url_prefix="")

@server.route("/")
@login_required
def get_all_servers():
    servers = Server.query.all()
    print([server.to_dict() for server in servers])
    return [server.to_dict() for server in servers]

@server.route("/", methods=["POST"])
@login_required
def create_new_server():
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form)
    if form.validate_on_submit():
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
        print("FORM ERRORS", form.errors)
        return form.errors, 401

@server.route("/<int:server_id>", methods=["PUT"])
@login_required
def update_server(server_id):
    form = NewServerForm()
    if form.validate_on_submit():
        server_name = form.name.data
        server_description = form.description.data
        server_image = form.server_image.data

        server = Server.query.get_or_404(server_id)

        if server.owner_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
        
        server.name = server_name
        server.description = server_description
        server.server_image = server_image

        db.session.commit()

        return jsonify(server.to_dict()), 200

@server.route("/<int:server_id>/channels")
@login_required
def get_all_server_channels(server_id):
    print("HELLO CHANNELS")
    channels = Channel.query.filter_by(server_id=server_id).all()
    print([channel.to_dict() for channel in channels])
    return [channel.to_dict() for channel in channels]

@server.route("/<int:server_id>/channels", methods=["POST"])
@login_required
def create_new_channel(server_id):
    form = NewChannelForm()
    if form.validate_on_submit():
        channel_name = form.name.data
        user_id = current_user.id

        new_channel = Channel(
            name = channel_name,
            server_id = server_id,
            owner_id = user_id
        )

        db.session.add(new_channel)
        db.session.commit()

        results = db.session.query(Channel).filter(Channel.id == new_channel.id)
        channel_data = []
        for channel in results:
            channel_dict = channel.to_dict()
            channel_data.append(channel_dict)

        return channel_data
    else:
        return form.errors, 401
    
# New route to get users from a specific server
@server.route("/<int:server_id>/users")
@login_required
def get_server_users(server_id):
    server = Server.query.get_or_404(server_id)
    users = server.users  # Assuming you have a relationship defined
    return jsonify([user.to_dict() for user in users])