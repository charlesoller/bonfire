from flask import Blueprint
from flask_login import login_required
from app.models import Channel, db, ChannelMessage, Reaction

channels_bp = Blueprint("channels", __name__, url_prefix="")

# Get all messages in a channel
@channels_bp.route('/<int:channel_id>/messages', methods=['GET'])
# @login_required
def get_channel_messages(channel_id):
    # get the channel or return 404 if not found
    channel = Channel.query.get_or_404(channel_id)
    messages = ChannelMessage.query.filter_by(channel_id=channel_id).all()
    print(channel)
    return [message.to_dict() for message in messages]


# Get all reactions on a channel message
@channels_bp.route('/channel_messages/<int:message_id>/reactions', methods=['GET'])
# @login_required
def get_channel_message_reactions(message_id):
    message = ChannelMessage.query.get_or_404(message_id)
    # get all reactions on the message
    reactions = Reaction.query.filter_by(channel_message_id=message_id).all()
    # return reactions as JSON
    return [reaction.to_dict() for reaction in reactions]