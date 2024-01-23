from flask import Blueprint, request, jsonify
from app.models import Toast, Comment, db
from flask_login import current_user, login_required
from ..forms.other_forms import ToastForm, CommentForm

posts_routes = Blueprint('posts', __name__)


# Get all posts
@posts_routes.route('/')
def get_posts():
    posts = Toast.query.all()
    return {"Posts": [post.to_dict() for post in posts]}


# Get a post by its id
@posts_routes.route("/<int:id>")
def get_post_by_id(id):
    post = Toast.query.get(id)
    return {"Post": post.to_dict()}


# Get all posts by the current user
@posts_routes.route("/current")
def get_post_by_user_id():
    user_id = current_user.id
    posts = Toast.query.filter(Toast.user_id==user_id).all()

    return {"Posts": [post.to_dict() for post in posts]}


# Create a post
@posts_routes.route("/", methods=["POST"])
@login_required
def create_post():
    user_id = current_user.id
    subbreadit_id = request.get_json()["subbreaditId"]

    form = ToastForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "title": form.title.data,
            "body": form.body.data,
            "user_id": user_id,
            "subbreadit_id": subbreadit_id
        }

        new_toast = Toast(**params)
        db.session.add(new_toast)
        db.session.commit()

        return new_toast.to_dict(), 201

    return form.errors, 400


# Update a post
@posts_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_post(id):
    post = Toast.query.get(id)

    form = ToastForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (post.user_id == current_user.id):
        if form.validate_on_submit():
            post.title = form.title.data
            post.body = form.body.data

            db.session.commit()

            return post.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401



# Delete a post
@posts_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    post = Toast.query.get(id)
    moderator_id = post.subbreadit.moderator_id

    if (post.user_id == current_user.id or moderator_id == current_user.id):
        db.session.delete(post)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401


# Create a comment by post id
@posts_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def create_comment(id):
    user_id = current_user.id

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "body": form.body.data,
            "user_id": user_id,
            "toast_id": id
        }

        new_comment = Comment(**params)

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return form.errors, 400
