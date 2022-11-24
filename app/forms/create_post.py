from flask_wtf import FlaskForm
from app.models import db, User
from wtforms import StringField, SelectMultipleField, SubmitField, IntegerField, FloatField, DateField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required
# from app.seeds.users import skills1, skills2, skills3, skills4, skills5, skills6, skills7



class CreatePostForm(FlaskForm):
    description = StringField("Describe the Post", validators = [DataRequired()])
    img_url = StringField("image url", validators = [DataRequired()])
    # img_url = StringField("image url")
    submit = SubmitField('Submit your Post')
