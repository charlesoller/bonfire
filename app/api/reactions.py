from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import db, ChannelMessage, ChatRoomMessage, Reaction, UserReaction

reactions_bp = Blueprint('reactions', __name__)

# Get all reactions on a channel message
@reactions_bp.route('/channel_messages/<int:message_id>/reactions', methods=['GET'])
# @login_required
def get_channel_message_reactions(message_id):
    message = ChannelMessage.query.get_or_404(message_id)
    # get all reactions on the message
    reactions = Reaction.query.filter_by(channel_message_id=message_id).all()
    # return reactions as JSON
    return jsonify([reaction.to_dict() for reaction in reactions])