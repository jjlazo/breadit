from .db import db

class Toast(db.Model):
    __tablename__="toasts"

    id= db.Column(db.Integer, nullable=False, primary_key=True)
    title= db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    # imate_url = db.URL
    user_id
    subbreadit_id
    created_at
    updated_at
