from .db import db
from user import User


class Subbredit(db.Model):
    __tablename__ = "subbreadits"

    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description= db.Column(db.Text, nullable=False)
    moderator_id= db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
