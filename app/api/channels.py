from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Channel, db, ChannelMessage, Reaction, UserReaction, ChatRoomMessage

channels_bp = Blueprint("channels", __name__)

# Get all messages in a channel
@channels_bp.route('/<int:channel_id>/messages', methods=['GET'])
@login_required
def get_channel_messages(channel_id):
    print(f"Fetching messages for channel: {channel_id}")
    channel = Channel.query.get_or_404(channel_id)  # Get the channel or return 404 if not found
    messages = ChannelMessage.query.filter_by(channel_id=channel_id).all()  # Get all messages in the channel
    return jsonify([message.to_dict() for message in messages])  # Return messages as JSON





# Get all reactions on a channel message
@channels_bp.route('/channel_messages/<int:message_id>/reactions', methods=['GET'])
@login_required
def get_channel_message_reactions(message_id):
    message = ChannelMessage.query.get_or_404(message_id)  # Get the channel message or return 404 if not found
    reactions = Reaction.query.filter_by(channel_message_id=message_id).all()  # Get all reactions on the message
    return jsonify([reaction.to_dict() for reaction in reactions])  # Return reactions as JSON