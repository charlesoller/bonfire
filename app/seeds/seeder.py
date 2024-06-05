from app.models import (
    db, User, ProfileImage, ServerImage, Server, 
    ServerUser, Channel, ChatRoomMessage, ChannelMessage, 
    MessageImage, Reaction, UserReaction, ChatRoom, 
    ChatRoomUser, environment, SCHEMA
)
from sqlalchemy.sql import text
from datetime import datetime

# Adds multiple users, servers, channels, and related data
def seed_data():
    users = [
        User(username='user1', email='user1@example.com', hashed_password='hashed_password_1', role='admin', created_at=datetime.now(), updated_at=datetime.now()),
        User(username='user2', email='user2@example.com', hashed_password='hashed_password_2', role='user', created_at=datetime.now(), updated_at=datetime.now()),
        User(username='user3', email='user3@example.com', hashed_password='hashed_password_3', role='user', created_at=datetime.now(), updated_at=datetime.now()),
        User(username='user4', email='user4@example.com', hashed_password='hashed_password_4', role='user', created_at=datetime.now(), updated_at=datetime.now()),
        User(username='user5', email='user5@example.com', hashed_password='hashed_password_5', role='user', created_at=datetime.now(), updated_at=datetime.now())
    ]

    profile_images = [
        ProfileImage(url='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg', user_id=1),
        ProfileImage(url='https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg', user_id=2),
        ProfileImage(url='https://cdn.fotofits.com/petzlover/gallery/img/l/british-shorthair-kitten-860950.jpg', user_id=3),
        ProfileImage(url='https://i.pinimg.com/originals/c5/c1/be/c5c1bec89341caeed8b17fa75aad9b83.jpg', user_id=4),
        ProfileImage(url='https://i.pinimg.com/736x/eb/ae/0e/ebae0e4403a3c8d5ed8dcce05000f744.jpg', user_id=5)
    ]

    servers = [
        Server(name='Server1', description='First server', owner_id=1, created_at=datetime.now(), updated_at=datetime.now()),
        Server(name='Server2', description='Second server', owner_id=2, created_at=datetime.now(), updated_at=datetime.now()),
        Server(name='Server3', description='Third server', owner_id=3, created_at=datetime.now(), updated_at=datetime.now()),
        Server(name='Server4', description='Fourth server', owner_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        Server(name='Server5', description='Fifth server', owner_id=5, created_at=datetime.now(), updated_at=datetime.now())
    ]

    server_images = [
        ServerImage(url='http://example.com/server1.jpg', server_id=1),
        ServerImage(url='http://example.com/server2.jpg', server_id=2),
        ServerImage(url='http://example.com/server3.jpg', server_id=3),
        ServerImage(url='http://example.com/server4.jpg', server_id=4),
        ServerImage(url='http://example.com/server5.jpg', server_id=5)
    ]

    server_users = [
        ServerUser(user_id=1, server_id=1, created_at=datetime.now(), updated_at=datetime.now()),
        ServerUser(user_id=2, server_id=2, created_at=datetime.now(), updated_at=datetime.now()),
        ServerUser(user_id=3, server_id=3, created_at=datetime.now(), updated_at=datetime.now()),
        ServerUser(user_id=4, server_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        ServerUser(user_id=5, server_id=5, created_at=datetime.now(), updated_at=datetime.now())
    ]
    
    chat_rooms = [
        ChatRoom(name="super awesome chat"),
        ChatRoom(name="super average chat"),
        ChatRoom(name="super cool chat"),
        ChatRoom(name="super fun chat"),
        ChatRoom(name="super boring chat")
    ]

    channels = [
        Channel(name='Channel1', server_id=1, owner_id=1),
        Channel(name='Channel2', server_id=2, owner_id=2),
        Channel(name='Channel3', server_id=3, owner_id=3),
        Channel(name='Channel4', server_id=4, owner_id=4),
        Channel(name='Channel5', server_id=5, owner_id=5)
    ]

    channel_messages = [
        ChannelMessage(user_id=1, channel_id=1, text_field='Hello, world!'),
        ChannelMessage(user_id=2, channel_id=2, text_field='Hi there!'),
        ChannelMessage(user_id=3, channel_id=3, text_field='Good morning!'),
        ChannelMessage(user_id=4, channel_id=4, text_field='Good evening!'),
        ChannelMessage(user_id=5, channel_id=5, text_field='Good night!')
    ]

    chat_room_messages = [
        ChatRoomMessage(user_id=1, chat_room_id=1, text_field='Hello, universe!'),
        ChatRoomMessage(user_id=2, chat_room_id=2, text_field='Hi there!'),
        ChatRoomMessage(user_id=3, chat_room_id=3, text_field='What\'s up!'),
        ChatRoomMessage(user_id=4, chat_room_id=4, text_field='How\'s it going!'),
        ChatRoomMessage(user_id=5, chat_room_id=5, text_field='Hey!')
    ]

    message_images = [
        MessageImage(url='http://example.com/message1.jpg', resource_type='channel', channel_message_id=1),
        MessageImage(url='http://example.com/message2.jpg', resource_type='channel', channel_message_id=2),
        MessageImage(url='http://example.com/message3.jpg', resource_type='channel', channel_message_id=3),
        MessageImage(url='http://example.com/message4.jpg', resource_type='channel', channel_message_id=4),
        MessageImage(url='http://example.com/message5.jpg', resource_type='channel', channel_message_id=5),
        MessageImage(url='http://example.com/message6.jpg', resource_type='chat_room', chat_room_message_id=1),
        MessageImage(url='http://example.com/message7.jpg', resource_type='chat_room', chat_room_message_id=2),
        MessageImage(url='http://example.com/message8.jpg', resource_type='chat_room', chat_room_message_id=3),
        MessageImage(url='http://example.com/message9.jpg', resource_type='chat_room', chat_room_message_id=4),
        MessageImage(url='http://example.com/message10.jpg', resource_type='chat_room', chat_room_message_id=5)
    ]

    reactions = [
        Reaction(channel_message_id=1, resource_type='channel', emoji='😀', count=5),
        Reaction(channel_message_id=2, resource_type='channel', emoji='😁', count=3),
        Reaction(channel_message_id=3, resource_type='channel', emoji='😂', count=4),
        Reaction(channel_message_id=4, resource_type='channel', emoji='🤣', count=2),
        Reaction(channel_message_id=5, resource_type='channel', emoji='😃', count=6),
        Reaction(chat_room_message_id=1, resource_type='chat_room', emoji='😄', count=5),
        Reaction(chat_room_message_id=2, resource_type='chat_room', emoji='😅', count=3),
        Reaction(chat_room_message_id=3, resource_type='chat_room', emoji='😆', count=4),
        Reaction(chat_room_message_id=4, resource_type='chat_room', emoji='😉', count=2),
        Reaction(chat_room_message_id=5, resource_type='chat_room', emoji='😊', count=6)
    ]

    user_reactions = [
        UserReaction(user_id=1, reaction_id=1),
        UserReaction(user_id=2, reaction_id=2),
        UserReaction(user_id=3, reaction_id=3),
        UserReaction(user_id=4, reaction_id=4),
        UserReaction(user_id=5, reaction_id=5)
    ]

    chat_room_users = [
        ChatRoomUser(user_id=1, chat_room_id=1),
        ChatRoomUser(user_id=2, chat_room_id=2),
        ChatRoomUser(user_id=3, chat_room_id=3),
        ChatRoomUser(user_id=4, chat_room_id=4),
        ChatRoomUser(user_id=5, chat_room_id=5)
    ]

    db.session.add_all(users + profile_images + servers + server_images + server_users + chat_rooms +
                       channels + channel_messages + chat_room_messages + message_images + 
                       reactions + user_reactions + chat_room_users)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built-in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM profile_images"))
        db.session.execute(text("DELETE FROM server_images"))
        db.session.execute(text("DELETE FROM servers"))
        db.session.execute(text("DELETE FROM server_user"))
        db.session.execute(text("DELETE FROM channels"))
        db.session.execute(text("DELETE FROM channel_messages"))
        db.session.execute(text("DELETE FROM chat_room_messages"))
        db.session.execute(text("DELETE FROM message_images"))
        db.session.execute(text("DELETE FROM reactions"))
        db.session.execute(text("DELETE FROM user_reactions"))
        db.session.execute(text("DELETE FROM chat_rooms"))
        db.session.execute(text("DELETE FROM chat_room_users"))
    db.session.commit()