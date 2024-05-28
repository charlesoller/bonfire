from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    profile_images = db.relationship('ProfileImage', backref='user', cascade="all, delete", lazy=True)
    channel_messages = db.relationship('ChannelMessage', backref='user', lazy=True)
    chat_room_messages = db.relationship('ChatRoomMessage', backref='user', lazy=True)
    reactions = db.relationship('UserReaction', backref='user', lazy=True)
    servers = db.relationship('ServerUser', cascade="all,delete", backref='user', lazy=True)
    chat_rooms = db.relationship('ChatRoomUser', cascade="all,delete", backref='user', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
    
class ProfileImage(db.Model):
    __tablename__ = 'profile_images'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)

class ServerImage(db.Model):
    __tablename__ = 'server_images'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

class Server(db.Model):
    __tablename__ = 'servers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(52), nullable=False)
    description = db.Column(db.String(240))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    channels = db.relationship('Channel', cascade="all,delete", backref='server', lazy=True)
    server_images = db.relationship('ServerImage', cascade="all,delete", backref='server', lazy=True)
    users = db.relationship('ServerUser', cascade="all,delete", backref='server', lazy=True)

class ServerUser(db.Model):
    __tablename__ = 'server_user'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(52), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    messages = db.relationship('ChannelMessage', cascade="all,delete", backref='channel', lazy=True)

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    text_field = db.Column(db.String(240))
    reactions = db.relationship('Reaction', cascade="all,delete", backref='channel_message', lazy=True)
    message_images = db.relationship('MessageImage', cascade="all,delete", backref='channel_message', lazy=True)

class ChatRoomMessage(db.Model):
    __tablename__ = 'chat_room_messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chat_room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'), nullable=False)
    text_field = db.Column(db.String(240))
    reactions = db.relationship('Reaction', cascade="all,delete", backref='chat_room_message', lazy=True)
    message_images = db.relationship('MessageImage', cascade="all,delete", backref='chat_room_message', lazy=True)

class MessageImage(db.Model):
    __tablename__ = 'message_images'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    resource_type = db.Column(db.Integer, nullable=False)
    channel_message_id = db.Column(db.Integer, db.ForeignKey('channel_messages.id'))
    chat_room_message_id = db.Column(db.Integer, db.ForeignKey('chat_room_messages.id'))

class Reaction(db.Model):
    __tablename__ = 'reactions'
    id = db.Column(db.Integer, primary_key=True)
    channel_message_id = db.Column(db.Integer, db.ForeignKey('channel_messages.id'))
    chat_room_message_id = db.Column(db.Integer, db.ForeignKey('chat_room_messages.id'))
    resource_type = db.Column(db.String, nullable=False)
    emoji = db.Column(db.String(1), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    user_reactions = db.relationship('UserReaction', cascade="all,delete", backref='reaction', lazy=True)

class UserReaction(db.Model):
    __tablename__ = 'user_reaction'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reaction_id = db.Column(db.Integer, db.ForeignKey('reactions.id'), nullable=False)

class ChatRoom(db.Model):
    __tablename__ = 'chat_rooms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    users = db.relationship('ChatRoomUser', cascade="all,delete", backref='chat_room', lazy=True)

class ChatRoomUser(db.Model):
    __tablename__ = 'chat_room_users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chat_room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'), nullable=False)
