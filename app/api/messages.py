from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, Channel, ChannelMessage

messages_bp = Blueprint('messages', __name__)

# Get all messages in a channel
@messages_bp.route('/channels/<int:channel_id>/messages', methods=['GET'])
# @login_required
def get_channel_messages(channel_id):
    # get the channel or return 404 if not found
    channel = Channel.query.get_or_404(channel_id)
    messages = ChannelMessage.query.filter_by(channel_id=channel_id).all()
    print(channel)
    return jsonify([message.to_dict() for message in messages])

# Get 
