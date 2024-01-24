from .db import db
from datetime import datetime

class Toast(db.Model):
    __tablename__="toasts"

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subbreadit_id = db.Column(db.Integer, db.ForeignKey('subbreadits.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates="toasts")
    subbreadit = db.relationship('Subbreadit', back_populates="toasts")
    comments = db.relationship("Comment", back_populates="toast")

    def to_dict(self):
       return {
           'id': self.id,
           'title': self.title,
           'body': self.body,
           'image_url': self.image_url,
           'user_id': self.user_id,
           'username': self.user.username,
           'subbreadit_id': self.subbreadit_id,
           'comments': [comment.to_dict() for comment in self.comments],
           'subbreadit_name': self.subbreadit.name
       }
