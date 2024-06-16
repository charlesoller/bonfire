from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, ChannelMessage, User
from sqlalchemy.orm import joinedload

messages_bp = Blueprint("messages", __name__)

"""
----------------------> MESSAGE ROUTES <----------------------
"""

# Get all messages in a channel
@messages_bp.route('/', methods=['GET'])
@login_required
def get_channel_messages():    
    # Query to get all messages in the channel with the associated user
    messages_with_users = (
        db.session.query(ChannelMessage)
            .join(User, ChannelMessage.user_id == User.id)
            .options(joinedload(ChannelMessage.user))
            .all()
    )

    messages_dict = [
        {
            'message_id': message.id,
            'user': {
                'id': message.user.id,
                'username': message.user.username,
                'email': message.user.email,
                'profile_images': [profile_image.to_dict() for profile_image in message.user.profile_images]
            },
            'reactions': [
                {
                    'id': reaction.id,
                    'channel_message_id': reaction.channel_message_id,
                    'chat_room_message_id': reaction.chat_room_message_id,
                    'resource_type': reaction.resource_type,
                    'emoji': reaction.emoji,
                    'count': reaction.count,
                    'user_reactions': [
                        {
                            'id': user_reaction.id,
                            'user_id': user_reaction.user.id,
                            'username': user_reaction.user.username,
                            'email': user_reaction.user.email
                        }
                        for user_reaction in reaction.user_reactions
                    ]
                }
                for reaction in message.reactions
            ],
            'channel_id': message.channel_id,
            'text_field': message.text_field,
            'created_at': message.created_at,
            'updated_at': message.updated_at
        }
        for message in messages_with_users
    ]

    # Return messages as JSON
    return jsonify(messages_dict)