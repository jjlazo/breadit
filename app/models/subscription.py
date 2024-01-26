from .db import db
# from models import Subbreadit, User
from .db import db, environment, SCHEMA, add_prefix_for_prod


subscriptions = db.Table(
    "subscriptions",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "subbreadit_id",
        db.Integer,
        db.ForeignKey("subbreadits.id"),
        primary_key=True
    )
)
if environment == "production":
    subscriptions.schema = SCHEMA

# class Subscription(db.Model):
#     __tablename__="subscriptions"
#     id = db.Column(db.Integer, nullable=False, primary_key=True)
#     user_id = db.Column(db.Integer, nullable=False, ForeignKey="users.id")
#     subbreadit_id = db.Column(db.Integer, nullable=False, ForeignKey="subbreadits.id")
#     created_at = db.Column(db.DateTime, nullable=False)

#     user = db.relationship("User", back_populates="subscriptions")


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'subbreadit_id': self.subbreadit_id
#         }
