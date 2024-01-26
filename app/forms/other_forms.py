from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


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
    image_url = URLField('Image URL')
    submit = SubmitField('Submit')
