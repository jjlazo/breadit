from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Toast

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/subscriptions')
def user_subscriptions(id):
    user = User.query.get(id)

    return {"Subbreadits": [subbreadit.to_dict() for subbreadit in user.subscriptions]}

@user_routes.route('/<int:id>/upvotes')
def user_upvotes(id):
    user = User.query.get(id)
    if user:
        return {"Toasts": [toast.to_dict() for toast in user.upvoted_toasts]}

@user_routes.route('/<int:id>/downvotes')
def user_downvotes(id):
    user = User.query.get(id)
    if user:
        return {"Toasts": [toast.to_dict() for toast in user.downvoted_toasts]}
