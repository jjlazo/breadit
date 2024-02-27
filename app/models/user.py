from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    toasts = db.relationship("Toast", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    subbreadit_mod = db.relationship("Subbreadit", back_populates="moderator")
    subscriptions = db.relationship("Subbreadit", secondary="subscriptions", back_populates="subscribers")
    upvoted_toasts = db.relationship("Toast", secondary="upvotes", back_populates="upvotes")
    downvoted_toasts = db.relationship("Toast", secondary="downvotes", back_populates="downvotes")

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
            'toasts': [toast.to_dict() for toast in self.toasts],
            # 'comments': [comment.to_dict() for comment in self.comments],
            'subscriptions': [subbreadit.id for subbreadit in self.subscriptions],
            'upvoted_toasts': [toast.id for toast in self.upvoted_toasts],
            'downvoted_toasts': [toast.id for toast in self.downvoted_toasts]
        }
