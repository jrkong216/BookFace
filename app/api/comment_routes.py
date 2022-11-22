from ..models import db, User, Comment
from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_comment import CreateCommentForm


comment_bp = Blueprint("comment_routes", __name__, url_prefix='/api/comments')


# ****************************** GET ALL Comments*********************************
# Get all comments
@comment_bp.route("/")
def get_all_comments():
    all_comments = Comment.query.all()

    response = []
    if all_comments:
        for comment in all_comments:
            # print(comment.to_dict())
            comment_obj = comment.to_dict()
            response.append(comment_obj)
        return {"Comments": response}, 200
    return { "Error": "404 NOT FOUND" }, 404



# ********************* GET Comment DETAILS BY COMMENT ID *************************
# Get comment by id
@comment_bp.route("/<int:comment_id>", methods=["GET"])
def get_comment_details(comment_id):
    current_comment = Comment.query.get(comment_id)
    if current_comment:
        return current_comment.to_dict(), 200
    return { "Error": "404 NOT FOUND" }, 404

    

## ****************************** EDIT Comment ************************************

@comment_bp.route("/<int:comment_id>", methods=["PUT"])
def edit_comment(comment_id):
    curr_comment = Comment.query.get(comment_id)

    create_comment_form = CreateCommentForm()
    create_comment_form['csrf_token'].data = request.cookies['csrf_token']

    if create_comment_form.validate_on_submit:
        data = create_comment_form.data

        description=create_comment_form.data["description"]

        curr_comment.description= description

        db.session.commit()

        return curr_comment.to_dict(), 201
    return { "Error": "Validation Error" }, 401


# ******************** DELETE COMMENT ON POST BY COMMENT ID ****************

@comment_bp.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_review(comment_id):

    current_comment = Comment.query.filter(Comment.id==comment_id).first()

    if current_comment:
        db.session.delete(current_comment)
        db.session.commit()

        return "succesfully deleted"
    return { "Error": "404 Review Not Found" }, 404
