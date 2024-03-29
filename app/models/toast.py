from .db import db
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Toast(db.Model):
    __tablename__="toasts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    subbreadit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('subbreadits.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates="toasts")
    subbreadit = db.relationship('Subbreadit', back_populates="toasts")
    comments = db.relationship("Comment", back_populates="toast", cascade="all,delete")
    upvotes = db.relationship("User", secondary="upvotes", back_populates="upvoted_toasts")
    downvotes = db.relationship("User", secondary="downvotes", back_populates="downvoted_toasts")

    def to_dict(self):
       return {
           'id': self.id,
           'title': self.title,
           'body': self.body,
           'image_url': self.image_url,
           'user_id': self.user_id,
           'username': self.user.username,
           'subbreadit_id': self.subbreadit_id,
           'moderator': self.subbreadit.moderator_id,
           'subbreadit_name': self.subbreadit.name,
           'upvotes': [user.id for user in self.upvotes],
           'downvotes': [user.id for user in self.downvotes]
            #'comments': [comment.to_dict() for comment in self.comments],
       }
