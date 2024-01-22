from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class SubbreaditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    # moderator = IntegerField('Moderator', validators=[DataRequired()])
    # created_at = DateTimeField('Created At', validators=[DataRequired()])
    submit = SubmitField('Submit')

class CommentForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired()])
    # user_id = IntegerField('User ID', validators=[DataRequired()])
    # toast_id = IntegerField('Toast ID', validators=[DataRequired()])
    # created_at = DateTimeField('Created At', validators=[DataRequired()])
    # updated_at = DateTimeField('Updated At')
    submit = SubmitField('Submit')

class ToastForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    image_url = URLField('Image URL')
    # user_id = IntegerField('User ID', validators=[DataRequired()])
    # subbreadit_id = IntegerField('Subbreadit ID', validators=[DataRequired()])
    # created_at = DateTimeField('Created At', validators=[DataRequired()])
    # updated_at = DateTimeField('Updated At')
    submit = SubmitField('Submit')
