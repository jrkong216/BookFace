from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class CreateGroupForm(FlaskForm):
    user_id = StringField("user_id")
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    # post_id = StringField("post_id")
    submit = SubmitField('Submit Your group')
