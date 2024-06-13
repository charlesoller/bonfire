import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Server
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server import server
from .seeds import seed_commands
from .config import Config
from .api.channels import channels_bp
from .api.server import server
from flask_socketio import SocketIO, emit, leave_room, join_room


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(channels_bp, url_prefix='/api/channels')
app.register_blueprint(server, url_prefix="/api/servers")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# @socketio.on("connect")
# def connected():
#     """event listener when client connects to the server"""
#     print("client has connected")
#     emit("connect",{"data":f"id: {request.sid} is connected"})

# @socketio.on('data')
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ",str(data))
#     emit("data",{'data':data,'id':request.sid}, broadcast=True)

# @socketio.on("disconnect")
# def disconnected():
#     """event listener when client disconnects to the server"""
#     print("user disconnected")
#     emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

@socketio.on("chat")
def handle_chat(data):
    print("1==========================================================================================================================================================================================================================================================")
    print(data)
    print("1==========================================================================================================================================================================================================================================================")
    emit('chat', data, broadcast=False, to=data['room'])

@socketio.on('leave')
def handle_leave(data):
    print("2==========================================================================================================================================================================================================================================================")
    print(data)
    print("2==========================================================================================================================================================================================================================================================")
    leave_room(data['room'])

@socketio.on('join')
def handle_join(data):
    print("3==========================================================================================================================================================================================================================================================")
    print(data)
    print("3==========================================================================================================================================================================================================================================================")
    join_room(data['room'])

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)
