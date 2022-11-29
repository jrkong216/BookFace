from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from .user import likes


Base=declarative_base()

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.TEXT, nullable=False)
    img_url = db.Column(db.TEXT, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    # db.relationship("Class_Name", back_populates="attribute from adjacent table")
    users = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts", cascade="all, delete-orphan")

    post_likes = db.relationship(
            "User",
            secondary= likes,
            back_populates="author_likes",
            cascade="all, delete"
        )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'img_url': self.img_url,
            'users': self.users.to_dict() if self.users else None,
            'created_at':self.created_at
            # "likes": len(self.post_likes)
        }

    def __repr__(self):
        return f'<Post, id={self.id}, user_id={self.user_id}, description={self.description}, img_url={self.img_url}'


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    description = db.Column(db.TEXT, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)


    posts = db.relationship("Post", back_populates="comments")
    users = db.relationship("User", back_populates="comments")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'users': self.users.to_dict(), #added
            'post_id': self.post_id,
            'created_at':self.created_at
        }

    def __repr__(self):
        return f'<Review, id={self.id}, user_id={self.user_id}, description={self.description}>'
