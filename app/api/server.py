from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server, db, Channel, ServerImage, User, ServerUser
from app.forms import NewServerForm, NewChannelForm
from sqlalchemy.orm import joinedload
import urllib.request
from urllib.error import URLError, HTTPError

server = Blueprint("servers", __name__, url_prefix="")

VALID_EXTENSIONS = ['jpg', 'png', 'jpeg']

def is_valid_image_url(url):
    try:
        request = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(request) as response:
            content_type = response.headers.get('Content-Type')
            if content_type and content_type.startswith('image'):
                return False
        return True
    except (URLError, HTTPError):
        return True

def check_last_segment_of_url(url):
    ext = url.split('.')
    if ext[-1] in VALID_EXTENSIONS:
        return False
    return True

@server.route("/")
@login_required
def get_all_servers():
    servers = (
        db.session.query(Server)
            .options(
                joinedload(Server.users).joinedload(ServerUser.user)
            )
            .all()
    )
    
    return [server.to_dict() for server in servers]

@server.route("/", methods=["POST"])
@login_required
def create_new_server():
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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

        if server_image is None or check_last_segment_of_url(server_image) or is_valid_image_url(server_image):
            server_image = 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg'

        db.session.add(new_server)
        db.session.commit()

        new_channel = Channel(
            name = "general",
            server_id = new_server.id,
            owner_id = user_id
        )

        db.session.add(new_channel)
        db.session.commit()

        new_server_image = ServerImage(
            url = server_image,
            server_id = new_server.id
        )

        db.session.add(new_server_image)
        db.session.commit()
        
        results = db.session.query(Server, ServerImage).join(ServerImage, ServerImage.server_id == Server.id).filter(Server.id == new_server.id).all()
        server_data = {}

        for server, server_image in results:
            server_dict = server.to_dict()
            server_data[server_dict['id']] = server_dict

        return server_data
    else:
        print("FORM ERRORS", form.errors)
        return form.errors, 401

@server.route("/<int:server_id>", methods=["PUT"])
@login_required
def update_server(server_id):
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_name = form.name.data
        server_description = form.description.data
        server_image = form.server_image.data

        server = Server.query.get_or_404(server_id)

        if server_image is None or check_last_segment_of_url(server_image) or is_valid_image_url(server_image):
            server_image = 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg'

        if server.owner_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403
        
        server.name = server_name
        server.description = server_description
        server.server_images[0].url = server_image

        db.session.commit()

        return jsonify(server.to_dict()), 200
    

@server.route("/<int:server_id>", methods=["DELETE"])
@login_required
def delete_server(server_id):
    server = Server.query.get_or_404(server_id)

    if server.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(server)
    db.session.commit()
    return jsonify({'message': 'Server deleted'}), 200


@server.route("/<int:server_id>/channels")
@login_required
def get_all_server_channels(server_id):
    channels = Channel.query.filter_by(server_id=server_id).all()
    return [channel.to_dict() for channel in channels]

@server.route("/<int:server_id>/channels", methods=["POST"])
@login_required
def create_new_channel(server_id):
    form = NewChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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
        channel_data = {}
        for channel in results:
            channel_dict = channel.to_dict()
            channel_data[channel_dict['id']] = channel_dict

        return channel_data
    else:
        return form.errors, 401
    
# New route to get users from a specific server
@server.route("/<int:server_id>/users")
@login_required
def get_server_users(server_id):
    server = Server.query.get_or_404(server_id)
    users = server.users  # Assuming you have a relationship defined
    user_list = [user.to_dict() for user in users]
    user_ids = [item['user_id'] for item in user_list]
    users = User.query.filter(User.id.in_(user_ids)).all()

    return jsonify([user.to_dict() for user in users])