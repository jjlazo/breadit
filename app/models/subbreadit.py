from .db import db
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Subbreadit(db.Model):
    __tablename__ = "subbreadits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    moderator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)

    toasts = db.relationship("Toast", back_populates="subbreadit")
    moderator = db.relationship("User", back_populates="subbreadit_mod")
    subscribers = db.relationship("User", secondary="subscriptions", back_populates="subscriptions")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'moderator_id': self.moderator_id,
            'subscribers': [user.id for user in self.subscribers],
            'toasts': [toast.to_dict() for toast in self.toasts]
        }
