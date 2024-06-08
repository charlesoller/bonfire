from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    print("HERE2===============================================================================================================================================================================")
    emit("chat", data, broadcast=True)

@socketio.on('join')
def handle_join(data):
    join_room(data['room'])