from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base=declarative_base()

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    img_url = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    # db.relationship("Class_Name", back_populates="attribute from adjacent table")
    user = db.relationship("User", back_populates="post", uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'img_url': self.img_url,
            'user': self.user.to_dict() if self.user else None,
            'created_at':self.created_at
        }

    def __repr__(self):
        return f'<Post, id={self.id}, user_id={self.user_id}, description={self.description}, img_url={self.img_url}'
