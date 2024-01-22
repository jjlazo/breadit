from .db import db


class Comment(db.Model):
    __tablename__='comments'

    id= db.Column(db.Integer, nullable=False, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, nullable=False, ForeignKey="subreadits.id")
    toast_id = db.Column(db.Integer, nullable=False, ForeignKey="toasts.id")
    created_at= db.Column(db.DateTime, nullable=False)
    updated_at= db.Column(db.DateTime)
