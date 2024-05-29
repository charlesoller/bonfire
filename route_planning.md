WEBSOCKETS ARE REQUIRED
https://flask-socketio.readthedocs.io/en/latest/

ALL ROUTES BEGIN WITH: /api/...

Servers
- Users should be able to view all publicly created servers.
    - GET /servers
- Users should be able to create new servers.
    - POST /servers
- Users should be able to update servers they created.
    - PUT /servers/{id}
- Users should be able to delete servers they created.
    - DELETE /servers/{id}
Channels
- Users should be able to view all public channels in a server.
    - GET /servers/{server_id}/channels
- Users should be able to create new channels in a server they own.
    - POST /servers/{server_id}/channels
- Users should be able to update channels they created.
    - PUT /channels/{channel_id}
- Users should be able to delete channels they created.
    - DELETE /channels/{channel_id}
Messages
- Users should be able to view all messages in a channel.
    - GET /channels/{channel_id}/messages
- Users should be able to create new messages.
    - POST /channels/{channel_id}/messages
- Users should be able to update messages they sent.
    - PUT /channel_messages/{message_id}
- Users should be able to delete messages they sent.
    - DELETE /channel_messages/{message_id}
Reactions
- Users should be able to view all reactions on a message.
    - GET /channel_messages/{message_id}/reactions
    - GET /chat_room_messages/{message_id}/reactions
- Users should be able to add reactions to a message.
    - POST /channel_messages/{message_id}/reactions
    - POST /chat_room_messages/{message_id}/reactions
- Users should be able to remove their reaction(s) from a message.
    - DELETE /reactions/{reaction_id}

Bonus: Threads
- Users should be able to view all threads within a channel.
    - GET /channels/threads
- Users should be able to create a thread off of a message.
    - POST /messages/{message_id}/threads
Bonus: Direct Messages
- Users should be able to view all direct messages between them and another user.
    - GET /chat_room/{chat_room_id}/messages
- Users should be able to create new direct messages.
    - POST /chat_room/{chat_room_id}/messages
- Users should be able to update messages they sent.
    - PUT /chat_room_messages/{message_id}
- Users should be able to delete messages they sent.
    - DELETE /chat_room_messages/{message_id}
