from flask import Blueprint, request
from app.models import User, ProfileImage, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import urllib.request
from urllib.error import URLError, HTTPError

auth_routes = Blueprint('auth', __name__)

VALID_EXTENSIONS = ['jpg', 'png', 'jpeg']

def is_valid_image_url(url):
    try:
        request = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(request) as response:
            content_type = response.headers.get('Content-Type')
            if content_type and content_type.startswith('image'):
                return False
        return True
    except:
        return True

def check_last_segment_of_url(url):
    ext = url.split('.')
    if ext[-1] in VALID_EXTENSIONS:
        return False
    return True

@auth_routes.route('/')
def authenticate():
    print("HELLO AUTH ROUTES")
    """
    Authenticates a user.
    """
    print("TEST")
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print("HELLO LOGIN POST")
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    print("HELLO LOGIN POST")
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/demo-login', methods=['POST'])
def demo_login():
    user = User.query.filter(User.email == 'user1@example.com').first()
    login_user(user)
    return user.to_dict()


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )

        profile_image_url = form.profileImage.data

        print("VALUE ERROR", form.profileImage.data)

        print("PROFILE IMAGE", profile_image_url)
        if profile_image_url is None or check_last_segment_of_url(profile_image_url) or is_valid_image_url(profile_image_url):
            print("PROFILE IMAGE", profile_image_url)
            profile_image_url = 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg'

        db.session.add(user)
        db.session.commit()

        profile_image = ProfileImage(
            url = profile_image_url,
            user_id = user.id
        )

        db.session.add(profile_image)
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401