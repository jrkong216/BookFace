from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True ),
    db.Column('posts', db.Integer, db.ForeignKey('posts.id'), primary_key=True )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    # projects = db.relationship("Project", back_populates="user")
    author_likes = db.relationship(
        'Post',
        secondary= likes,
        back_populates="post_likes",
        cascade= "all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

    def __repr__(self):
        return f'<User, id={self.id}, username={self.username}, first_name={self.first_name}, last_name={self.last_name}>'
