from .db import db
from models import Subbreadit, User


class Subscription(db.Model):
    __tablename__="subscriptions"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, ForeignKey="users.id")
    subbreadit_id = db.Column(db.Integer, nullable=False, ForeignKey="subreadits.id")
    created_at = db.Column(db.DateTime, nullable=False)
