from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db
from ..forms.create_post import CreatePostForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

# ************************************************************************************************

Base=declarative_base()

post_bp = Blueprint("post_routes", __name__, url_prefix="/api/posts")

# ************************************ POST ROUTES ***********************************************
# *************************************************************************************************



# ************************************ GET ALL POSTS ***********************************************

# Get all posts
@post_bp.route("/", methods=["GET"])
def get_all_post():
    all_posts = Post.query.all()
    response = []
    print("DID THIS GET HERE?! ***************************************")
    if all_posts:
        for post in all_posts:
            post_obj = post.to_dict()
            response.append(post_obj)

        return{"Posts": response}, 200

    return {"Error":"404 Not Found"}, 404


# ************************************ CREATE NEW POST ***********************************************

# Create new post
@post_bp.route("/new/", methods = ["POST"])
# @login_required
def create_post():

    create_post_form = CreatePostForm()
    create_post_form['csrf_token'].data = request.cookies['csrf_token']
    print("this is current user.id", current_user.id)
    if create_post_form.validate_on_submit():
        post = Post()
        data = create_post_form.data
        post = Post(
                        user_id=current_user.id,
                        description = data["description"],
                        img_url = data["img_url"],
                        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict(), 201

    return {"Error": "Validation Error"}, 401

# ***************************************   EDIT POST BY POST ID  ***************************************************

#Edit Post details
@post_bp.route("/<int:post_id>/", methods=["PUT"])
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

        db.session.commit()

        new_post_obj = post.to_dict()

        return new_post_obj, 201

    return {"Error": "Validation Error"}, 401

# ************************************   DELETE POST BY POST ID   ******************************************************

# Delete post
@post_bp.route("/<int:post_id>/", methods=["DELETE"])
@login_required
def delete_post(post_id):

    post = Post.query.get(post_id)

    if post:
        db.session.delete(post)
        db.session.commit()

        return {"message" : "Post succesfully deleted"}, 200

    return {"Error": "404 Post Not Found"}, 404

#*****************************************************************************************************************************
