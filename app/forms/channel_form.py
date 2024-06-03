from flask_wtf import FlaskForm
from wtforms.fields import (
    BooleanField, DateField, StringField, SubmitField, TextAreaField, TimeField, PasswordField, SelectField
)
from wtforms.validators import DataRequired, ValidationError

class NewChannelForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])