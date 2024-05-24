from app.models import db, User, ProfileImage, ServerImage, Server, ServerUser, Channel, Message, MessageImage, Reaction, UserReaction, DirectMessage, DirectMessagesUser, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_data():
    user1 = User(username='user1', email='user1@example.com', hashed_password='hashed_password_1', role='admin', created_at=datetime.now(), updated_at=datetime.now())
    user2 = User(username='user2', email='user2@example.com', hashed_password='hashed_password_2', role='user', created_at=datetime.now(), updated_at=datetime.now())

    profile_image1 = ProfileImage(url='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg', user_id=1)
    profile_image2 = ProfileImage(url='https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg', user_id=2)

    server1 = Server(name='Server1', description='First server', owner_id=1, created_at=datetime.now(), updated_at=datetime.now())
    server2 = Server(name='Server2', description='Second server', owner_id=2, created_at=datetime.now(), updated_at=datetime.now())

    server_image1 = ServerImage(url='http://example.com/server1.jpg', server_id=1)
    server_image2 = ServerImage(url='http://example.com/server2.jpg', server_id=2)

    server_user1 = ServerUser(user_id=1, server_id=1, created_at=datetime.now(), updated_at=datetime.now())
    server_user2 = ServerUser(user_id=2, server_id=2, created_at=datetime.now(), updated_at=datetime.now())

    channel1 = Channel(name='Channel1', server_id=1, owner_id=1)
    channel2 = Channel(name='Channel2', server_id=2, owner_id=2)

    message1 = Message(user_id=1, resource_type='channel', resource_id=1, text_field='Hello, world!')
    message2 = Message(user_id=2, resource_type='channel', resource_id=2, text_field='Hi there!')

    message_image1 = MessageImage(url='http://example.com/message1.jpg', message_id=1)
    message_image2 = MessageImage(url='http://example.com/message2.jpg', message_id=2)

    reaction1 = Reaction(message_id=1, emoji='😀', count=5)
    reaction2 = Reaction(message_id=2, emoji='😢', count=3)

    user_reaction1 = UserReaction(user_id=1, reaction_id=1)
    user_reaction2 = UserReaction(user_id=2, reaction_id=2)

    direct_message1 = DirectMessage(name="super awesome chat")
    direct_message2 = DirectMessage()

    direct_messages_user1 = DirectMessagesUser(user_id=1, direct_message_id=1)
    direct_messages_user2 = DirectMessagesUser(user_id=2, direct_message_id=2)

    db.session.add_all([user1, user2, profile_image1, profile_image2, server1, server2, server_image1, server_image2,
                        server_user1, server_user2, channel1, channel2, message1, message2, message_image1, message_image2,
                        reaction1, reaction2, user_reaction1, user_reaction2, direct_message1, direct_message2,
                        direct_messages_user1, direct_messages_user2])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
