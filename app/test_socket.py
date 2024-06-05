import socketio

# Create a Socket.IO client
sio = socketio.Client()

# Define event handlers
@sio.event
def connect():
    print('Connection established')
    sio.emit('join', {'room': 'test_room'})
    sio.emit('send_message', {'room': 'test_room', 'message': 'Hello, World!'})

@sio.event
def disconnect():
    print('Disconnected from server')

@sio.event
def receive_message(data):
    print('Message received:', data['message'])

@sio.event
def response(data):
    print('Response received:', data['message'])

# Connect to the server
sio.connect('http://localhost:8000')
sio.wait()
