from flask import Blueprint, request
from app.models import Subbreadit, Toast, Comment, db
from flask_login import login_required, current_user

from app.models.user import User
from ..forms.other_forms import SubbreaditForm

subbreadits_routes = Blueprint("subbreadits", __name__)

# Get all subbreadits
@subbreadits_routes.route("/")
def get_all_subbreadits():
    subbreadits = Subbreadit.query.all()
    return {"Subbreadits": [subbreadit.to_dict() for subbreadit in subbreadits]}


# Get all posts of subbreadit by id
@subbreadits_routes.route("/<int:id>/posts")
def get_posts_by_subbreadit_id(id):
    posts = Toast.query.filter(Toast.subbreadit_id==id).all()
    return {"Posts": [post.to_dict() for post in posts]}


# Create a Subbreadit
@subbreadits_routes.route("/", methods=["POST"])
@login_required
def create_subbreadit():
    user_id = current_user.id

    form = SubbreaditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "name": form.name.data,
            "description": form.description.data,
            "moderator_id": user_id
        }

        new_subbreadit = Subbreadit(**params)

        db.session.add(new_subbreadit)
        db.session.commit()

        return new_subbreadit.to_dict(), 201

    return form.errors, 400


# Create a subscription
@subbreadits_routes.route("/<int:id>/subscription", methods=["POST"])
@login_required
def create_subscription(id):
    user = User.query.get(current_user.id)
    subbreadit = Subbreadit.query.get(id)

    user.subscriptions.append(subbreadit)
    db.session.commit()

    return {"message": "Successfully subscribed"}, 201


# Delete a subscription
@subbreadits_routes.route("/<int:id>/subscription", methods=["DELETE"])
@login_required
def delete_subscription(id):
    user = User.query.get(current_user.id)
    subbreadit = Subbreadit.query.get(id)

    user.subscriptions.remove(subbreadit)
    db.session.commit()

    return {"message": "Successfully deleted"}, 201
