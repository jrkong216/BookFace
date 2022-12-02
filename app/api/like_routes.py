from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import db, Like, Post
from ..forms.create_post import CreatePostForm
# from ..forms.create_comment import CreateCommentForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

# ************************************************************************************************

Base=declarative_base()

like_bp = Blueprint("like_routes", __name__, url_prefix="/api/likes")

# ************************************ LIKE ROUTES ***********************************************
# *************************************************************************************************


# ************************************ GET ALL LIKES ***********************************************

# Get all posts -working
@like_bp.route("/", methods=["GET"])
def get_all_like():
    all_likes = Like.query.all()
    # all_posts = Post.query.options(joinedload(Post.post_likes)).all()
    print("this is all_likes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", all_likes)
    response = []
    print("DID THIS GET HERE?! ***************************************")
    if all_likes:
        for like in all_likes:
            like_obj = like.to_dict()
            # post_like_dict = [user.to_dict() for user in post.post_likes]
            # post_obj["likes"] = post_like_dict
            response.append(like_obj)

        return{"Likes": response}, 200

    return {"Error":"404 Not Found"}, 404


# ************************************ CREATE A LIKE BY POST ID ***********************************************

# route to create a new like
# @like_bp.route("/<int:post_id>/likes/new", methods=["POST"])
# @login_required
# def create_new_like(post_id):

#     current_post = Post.query.filter(Post.id == post_id).first()
#     print("current post",current_post)

#     new_like = current_post.append(post_id, current_user.id)

#     db.session.add(new_like)
#     db.session.commit()

#     new_like_obj = new_like.to_dict()
#     return new_like_obj, 201


# ************************************   DELETE LIKE BY POST ID   ******************************************************

# Delete like
@like_bp.route("/<int:like_id>/", methods=["DELETE"])
@login_required
def delete_like(like_id):

    like = Like.query.get(like_id)

    if like:
        db.session.delete(like)
        db.session.commit()

        return {"message" : "Like succesfully deleted"}, 200

    return {"Error": "404 Like Not Found"}, 404

#*****************************************************************************************************************************
