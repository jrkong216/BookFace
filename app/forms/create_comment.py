from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class CreateCommentForm(FlaskForm):
    description = StringField("Your comment", validators=[DataRequired()])
    submit = SubmitField('Submit Your comment')
