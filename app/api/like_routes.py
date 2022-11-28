from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db, Comment, User
from ..forms.create_post import CreatePostForm
# from ..forms.create_comment import CreateCommentForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

# ************************************************************************************************

Base=declarative_base()

like_bp = Blueprint("like_routes", __name__, url_prefix="/api/likes")

# ************************************ POST ROUTES ***********************************************
# *************************************************************************************************


# ***************************************   EDIT POST BY POST ID  ***************************************************

#Edit Post details - working
@like_bp.route("/<int:post_id>/", methods=["PUT"])
@login_required
def edit_post(post_id):
    edit_post_form = CreatePostForm()

    edit_post_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_post_form.validate_on_submit():
        data = edit_post_form.data

        post = Post.query.get(post_id)

        post_obj = post.to_dict()

        post.description = data["description"]
        post.img_url = data["img_url"]
        post.likes=data["like"]

        db.session.commit()

        new_post_obj = post.to_dict()

        return new_post_obj, 201

    return {"Error": "Validation Error"}, 401

# ************************************   DELETE LIKE BY POST ID   ******************************************************

# Delete post - working
# @post_bp.route("/<int:post_id>/", methods=["DELETE"])
# @login_required
# def delete_post(post_id):

#     post = Post.query.get(post_id)

#     if post:
#         db.session.delete(post)
#         db.session.commit()

#         return {"message" : "Post succesfully deleted"}, 200

#     return {"Error": "404 Post Not Found"}, 404

#*****************************************************************************************************************************
