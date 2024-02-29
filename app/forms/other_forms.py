from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField, FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class SubbreaditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')

class CommentForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired()])
    submit = SubmitField('Submit')

class ToastForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    subbreadit_id = IntegerField("Subbreadit", validators=[DataRequired()])
    submit = SubmitField('Submit')
