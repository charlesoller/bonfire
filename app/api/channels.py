from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Channel, db, ChannelMessage, Reaction, UserReaction, ChatRoomMessage, User
from sqlalchemy.orm import joinedload

channels_bp = Blueprint("channels", __name__)

"""
----------------------> MESSAGES ROUTES <----------------------
"""

# Get all messages in a channel
@channels_bp.route('/<int:channel_id>/messages', methods=['GET'])
@login_required
def get_channel_messages(channel_id):
    # Get the channel or return 404 if not found
    channel = Channel.query.get_or_404(channel_id)
    
    # Query to get all messages in the channel with the associated user
    messages_with_users = (
        db.session.query(ChannelMessage)
            .join(User, ChannelMessage.user_id == User.id)
            .options(joinedload(ChannelMessage.user))
            .filter(ChannelMessage.channel_id == channel_id)
            .all()
    )
    # Convert to dictionary format
    # print("=============================================================================================================================================================================================")
    # print(messages_with_users)
    # print("=============================================================================================================================================================================================")

    messages_dict = [
        {
            'message_id': message.id,
            'user': {
                'id': message.user.id,
                'username': message.user.username,
                'email': message.user.email,
                'profile_image': [profile_image.to_dict() for profile_image in message.user.profile_images]
            },
            'channel_id': message.channel_id,
            'text_field': message.text_field,
            'created_at': message.created_at,
            'updated_at': message.updated_at
        }
        for message in messages_with_users
    ]

    # Return messages as JSON
    return jsonify(messages_dict)

# Create a new message in a channel
@login_required
@channels_bp.route('/<int:channel_id>/messages', methods=['POST'])
def create_channel_message(channel_id):
    channel = Channel.query.get_or_404(channel_id)  # Get the channel or return 404 if not found
    data = request.get_json()  # Get the JSON data from the request
    text = data.get('text_field')  # Get the text field from the data
    
    if not text:
        return jsonify({'error': 'Text field is required'}), 400  # Return error if text field is missing
    
    new_message = ChannelMessage(
        user_id=1,  # Use a hardcoded user ID for testing
        channel_id=channel_id,
        text_field=text
    )
    db.session.add(new_message)  # Add the new message to the session
    db.session.commit()  # Commit the session to save the message
    return jsonify(new_message.to_dict()), 201  # Return the new message as JSON

# Update a message by its ID
@channels_bp.route('/channel_messages/<int:message_id>', methods=['PUT'])
@login_required
def update_channel_message(message_id):
    message = ChannelMessage.query.get_or_404(message_id)  # Get the message or return 404 if not found
    data = request.get_json()  # Get the JSON data from the request
    message.text_field = data.get('text_field', message.text_field)  # Update the text field
    db.session.commit()  # Commit the session to save changes
    return jsonify(message.to_dict())  # Return the updated message as JSON

# Delete a message by its ID
@channels_bp.route('/channel_messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_channel_message(message_id):
    message = ChannelMessage.query.get_or_404(message_id)  # Get the message or return 404 if not found
    db.session.delete(message)  # Delete the message from the session
    db.session.commit()  # Commit the session to save changes
    return jsonify({'message': 'Message deleted'}), 200  # Return success message


"""
----------------------> REACTION ROUTES <----------------------
"""


# Get all reactions on a channel message
@channels_bp.route('/channel_messages/<int:message_id>/reactions', methods=['GET'])
@login_required
def get_channel_message_reactions(message_id):
    message = ChannelMessage.query.get_or_404(message_id)  # Get the channel message or return 404 if not found
    reactions = Reaction.query.filter_by(channel_message_id=message_id).all()  # Get all reactions on the message
    return jsonify([reaction.to_dict() for reaction in reactions])  # Return reactions as JSON

# Get all reactions on a chat room message
@channels_bp.route('/chat_room_messages/<int:message_id>/reactions', methods=['GET'])
@login_required
def get_chat_room_message_reactions(message_id):
    message = ChatRoomMessage.query.get_or_404(message_id)  # Get the chat room message or return 404 if not found
    reactions = Reaction.query.filter_by(chat_room_message_id=message_id).all()  # Get all reactions on the message
    return jsonify([reaction.to_dict() for reaction in reactions])  # Return reactions as JSON

# Add a reaction to a channel message
@channels_bp.route('/channel_messages/<int:message_id>/reactions', methods=['POST'])
@login_required
def add_channel_message_reaction(message_id):
    message = ChannelMessage.query.get_or_404(message_id)  # Get the channel message or return 404 if not found
    data = request.get_json()  # Get the JSON data from the request
    emoji = data.get('emoji')  # Get the emoji from the data
    
    if not emoji:
        return jsonify({'error': 'Emoji is required'}), 400  # Return error if emoji is missing
    
    new_reaction = Reaction(
        channel_message_id=message_id,
        resource_type='channel_message',
        emoji=emoji,
        count=1
    )
    db.session.add(new_reaction)  # Add the new reaction to the session
    db.session.commit()  # Commit the session to save the reaction
    
    user_reaction = UserReaction(
        user_id=1,  # Use a hardcoded user ID for testing
        reaction_id=new_reaction.id
    )
    db.session.add(user_reaction)  # Add the user's reaction to the session
    db.session.commit()  # Commit the session to save the user's reaction
    
    return jsonify(new_reaction.to_dict()), 201  # Return the new reaction as JSON

# Add a reaction to a chat room message
@channels_bp.route('/chat_room_messages/<int:message_id>/reactions', methods=['POST'])
@login_required
def add_chat_room_message_reaction(message_id):
    message = ChatRoomMessage.query.get_or_404(message_id)  # Get the chat room message or return 404 if not found
    data = request.get_json()  # Get the JSON data from the request
    emoji = data.get('emoji')  # Get the emoji from the data
    
    if not emoji:
        return jsonify({'error': 'Emoji is required'}), 400  # Return error if emoji is missing
    
    new_reaction = Reaction(
        chat_room_message_id=message_id,
        resource_type='chat_room_message',
        emoji=emoji,
        count=1
    )
    db.session.add(new_reaction)  # Add the new reaction to the session
    db.session.commit()  # Commit the session to save the reaction
    
    user_reaction = UserReaction(
        user_id=1,  # Use a hardcoded user ID for testing
        reaction_id=new_reaction.id
    )
    db.session.add(user_reaction)  # Add the user's reaction to the session
    db.session.commit()  # Commit the session to save the user's reaction
    
    return jsonify(new_reaction.to_dict()), 201  # Return the new reaction as JSON

# Remove a user's reaction from a message
@channels_bp.route('/reactions/<int:reaction_id>', methods=['DELETE'])
@login_required
def delete_reaction(reaction_id):
    reaction = Reaction.query.get_or_404(reaction_id)  # Get the reaction or return 404 if not found
    user_reaction = UserReaction.query.filter_by(user_id=1, reaction_id=reaction_id).first()  # Use a hardcoded user ID for testing
    
    if not user_reaction:
        return jsonify({'error': 'Unauthorized or reaction not found'}), 403  # Return error if unauthorized or reaction not found
    
    db.session.delete(user_reaction)  # Delete the user's reaction from the session
    db.session.commit()  # Commit the session to save changes
    
    reaction.count -= 1  # Decrease the reaction count
    if reaction.count == 0:
        db.session.delete(reaction)  # Delete the reaction if count is zero
    db.session.commit()  # Commit the session to save changes
    
    return jsonify({'message': 'Reaction removed'}), 200  # Return success message
