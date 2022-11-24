from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base=declarative_base()

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    description = db.Column(db.String(2000), nullable=False)
    img_url = db.Column(db.String(2000), nullable=False)
    # img_url = db.Column(db.String(2000), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    # db.relationship("Class_Name", back_populates="attribute from adjacent table")
    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'img_url': self.img_url,
            'user': self.user.to_dict() if self.user else None,
            'created_at':self.created_at,

        }

    def __repr__(self):
        return f'<Post, id={self.id}, user_id={self.user_id}, description={self.description}, img_url={self.img_url}'


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    description = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)


    posts = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'user': self.user.to_dict(), #added
            'created_at':self.created_at
        }

    def __repr__(self):
        return f'<Review, id={self.id}, user_id={self.user_id}, description={self.description}>'
