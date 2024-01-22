from .db import db

class Toast(db.Model):
    __tablename__="toasts"

    id= db.Column(db.Integer, nullable=False, primary_key=True)
    title= db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.URL)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    subbreadit_id = db.Column(db.Integer, db.ForeignKey('subbreadit.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates="toast")
    subbreadit = db.relationship('Subbreadit', back_populates="toast")
