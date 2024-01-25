from flask import Blueprint, request
from app.models import Toast, Comment, db
from flask_login import current_user, login_required
from app.forms.other_forms import CommentForm
from app.models.comment import Comment
from app.models.subbreadit import Subbreadit


comments_routes = Blueprint("comments", __name__)


# Update a comment
@comments_routes.route("/<int:id>", methods=["PUT"])
def update_comment(id):
    comment = Comment.query.get(id)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (comment.user_id == current_user.id):
        if form.validate_on_submit():
            comment.body = form.body.data
            db.session.commit()

            return comment.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401



# Delete a comment
@comments_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    moderator_id = comment.toast.subbreadit.moderator_id

    if (comment.user_id == current_user.id or moderator_id == current_user.id):
        db.session.delete(comment)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401
