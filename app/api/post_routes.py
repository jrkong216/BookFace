from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db, Comment, User, Like
from ..forms.create_post import CreatePostForm
from ..forms.create_comment import CreateCommentForm
from ..forms.create_like import CreateLikeForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import joinedload
from app.api.helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3
)



# ************************************************************************************************

Base=declarative_base()

post_bp = Blueprint("post_routes", __name__, url_prefix="/api/posts")

# ************************************ POST ROUTES ***********************************************
# *************************************************************************************************



# ************************************ GET ALL POSTS ***********************************************

# Get all posts -working
@post_bp.route("/", methods=["GET"])
def get_all_post():
    all_posts = Post.query.all()
    # all_posts = Post.query.options(joinedload(Post.post_likes)).all()
    # print("this is all_posts", all_posts)
    response = []
    # print("DID THIS GET HERE?! ***************************************")
    if all_posts:
        for post in all_posts:
            post_obj = post.to_dict()
            # post_like_dict = [user.to_dict() for user in post.post_likes]
            # post_obj["likes"] = post_like_dict
            response.append(post_obj)

        return{"Posts": response}, 200

    return {"Error":"404 Not Found"}, 404

# ************************************ GET POST DETAILS BY POST ID ***********************************************

# Get post by post_id - NOT WORKING currently
@post_bp.route("/<int:post_id>/", methods=["GET"])
def get_post_profile(post_id):

    post = Post.query.filter(Post.id == post_id).first()
    post_user = User.query.filter(User.id == post.user_id).first()

    if post:
        post_obj = post.to_dict()
        post_user_obj = post_user.to_dict()
        result = {**post_obj, **post_user_obj}

        response={**result}
        return response

    return { "Error": "Post not found" }, 404


# ************************************ CREATE NEW POST ***********************************************

# Create new post
# @post_bp.route("/new/", methods = ["POST"])
# # @login_required
# def create_post():

#     create_post_form = CreatePostForm()
#     create_post_form['csrf_token'].data = request.cookies['csrf_token']
#     print("this is current user.id", current_user.id)
#     if create_post_form.validate_on_submit():
#         post = Post()
#         data = create_post_form.data
#         post = Post(
#                         user_id=current_user.id,
#                         description = data["description"],
#                         img_url = data["img_url"],
#                         )

#         db.session.add(post)
#         db.session.commit()
#         return post.to_dict(), 201

#     return {"Error": "Validation Error"}, 401

# ************************************ CREATE NEW POST AWS STYLE***********************************************
@post_bp.route("/new/", methods=["POST"])
# @login_required
def create_post():
    print("DID IT ENTER THE CREATE_POST FUCNTION")
    #request.files is in the a dictionary: in this case {thumbnail_pic: <filestorage: 'xxxx.jpg'>, content: <filestorage:'xxxx.mp4'>} xxxhere are the name you stored this file in our local folder
    if "content" not in request.files:
        return {"errors": "Image file is required."}, 400
    print("request****************", request)
    #content is the <filestorage: 'xxxx.mp4'> binary form of the video
    content=request.files["content"]

    #request.filename is the string of file name: 'xxx.mp4'
    if not allowed_file(content.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    #here is to get the unique/hashed filename: the file name here are random letters and numbers, not the one you originally named in your local folder
    content.filename=get_unique_filename(content.filename)

    #image_upload will return {"url": 'http//bucketname.s3.amazonaws.com/xxxx.jpg} xxx are the random letter and numbers filename
    image_uploaded = upload_file_to_s3(content)
    print("video_uploaded!!!!!!!!!!!!!!!!!!!!!!!!!", image_uploaded)
    if "url" not in image_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return image_uploaded, 400

    #this url will be store in the database. The database will only have this url, not the actual photo or video which are stored in aws.
    image_url=image_uploaded["url"]
    # flask_login allows us to get the current user from the request

    #here we will form a video and save it to the db according to the keys defined in the model
    # thumbnailpicture and video url are obtained above, from request.files
    #while description and title are obtained from request.form
    #request.form returns a object similar format as request.files : {"title": xxx, "description": xxx}
    print("current_user", current_user)
    create_post_form = CreatePostForm(
        user_id=current_user.id,
        description = data["description"],
        img_url = image_url,
    )


    print('uploaded_image!!!!!!!!!!!!!!!!!', create_post_form)

    db.session.add(create_post_form)
    db.session.commit()


    #then add and commit to database, in this process the new video id and createdat, updated at will be generated
    db.session.add(create_post_form)
    db.session.commit()

    # since the id, created at and updated at are new info, refresh() function is needed to send those info to the frontend
    # so that it knows which page to turn to . and then to update the time accordingly
    db.session.refresh(create_post_form)
    print('uploaded_video.to_dict()', create_post_form.to_dict())
    return  create_post_form.to_dict()




# ************************************ CREATE A COMMENT BY POST ID ***********************************************

# route to create a new comment
@post_bp.route("/<int:post_id>/comments/new", methods=["POST"])
@login_required
def create_new_comment(post_id):

    # create a new instance of commentform
    new_comment_form = CreateCommentForm()
    new_comment_form['csrf_token'].data = request.cookies['csrf_token']

    if new_comment_form.validate_on_submit():

        comment_data = new_comment_form.data
        # print(new_comment_form.data)

        new_comment = Comment()
        new_comment_form.populate_obj(new_comment)

        current_post = Post.query.filter(Post.id == post_id).first()
        # print("current coder",current_post)

        new_comment = Comment(description=comment_data["description"], user_id=current_user.id, post_id=current_post.id)

        db.session.add(new_comment)
        db.session.commit()

        new_comment_obj = new_comment.to_dict()
        return new_comment_obj, 201

    return { "Error": "Validation Error" }, 400

# ***************************************   EDIT POST BY POST ID  ***************************************************

#Edit Post details - working
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

# Delete post - working
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

# ************************************ CREATE NEW LIKE BY POST ID ***********************************************

# Create new post - working
@post_bp.route("/<int:post_id>/<int:sessionUserId>/likes/new", methods = ["POST"])
# @login_required
def create_like(post_id, sessionUserId):

    create_like_form = CreateLikeForm()
    create_like_form['csrf_token'].data = request.cookies['csrf_token']
    print("this is current user.id", current_user.id)
    if create_like_form.validate_on_submit():
        like = Like()
        data = create_like_form.data
        like = Like(
                user_id = data["user_id"],
                post_id = data["post_id"]
                 )

        db.session.add(like)
        db.session.commit()
        return like.to_dict(), 201

    return {"Error": "Validation Error"}, 401




# # ************************************ CREATE A LIKE BY POST ID ***********************************************

# # route to create a new like
# @post_bp.route("/<int:post_id>/<int:sessionUserId>/likes/new", methods=["PUT"])
# @login_required
# def create_new_like(post_id, sessionUserId):

#     current_post = Post.query.filter(Post.id == post_id).first()
#     print("current post **************************** PRE APPEND",current_post)

#     current_post.likes.append({"user_id": sessionUserId, "post_id": post_id})
#     # current_post.likes = likes.append(post_id, current_user.id)
#     print("current post **************************** POST APPEND",current_post)
#     # db.session.add(new_like)
#     db.session.commit()

#     current_post_obj = current_post.to_dict()
#     return current_post_obj, 201


# # ************************************ Add IMAGE TO AWS ***********************************************
@post_bp.route('/upload-image', methods=["POST"])
@login_required
def add_image_to_s3():

    #request.files is in the a dictionary: in this case {thumbnail_pic: <filestorage: 'xxxx.jpg'>, content: <filestorage:'xxxx.mp4'>} xxxhere are the name you stored this file in our local folder
    if "content" not in request.files:
        return {"errors": "Video file is required."}, 400
    print("request****************", request)
    #content is the <filestorage: 'xxxx.mp4'> binary form of the video
    content=request.files["content"]

    #request.filename is the string of file name: 'xxx.mp4'
    if not allowed_file(content.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    #here is to get the unique/hashed filename: the file name here are random letters and numbers, not the one you originally named in your local folder
    content.filename=get_unique_filename(content.filename)

    #image_upload will return {"url": 'http//bucketname.s3.amazonaws.com/xxxx.mp4} xxx are the random letter and numbers filename
    image_uploaded = upload_file_to_s3(content)
    print("video_uploaded!!!!!!!!!!!!!!!!!!!!!!!!!", image_uploaded)
    if "url" not in image_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return image_uploaded, 400

    #this url will be store in the database. The database will only have this url, not the actual photo or video which are stored in aws.
    video_url=image_uploaded["url"]
    # flask_login allows us to get the current user from the request


    #here we will form a video and save it to the db according to the keys defined in the model
    # thumbnailpicture and video url are obtained above, from request.files
    #while description and title are obtained from request.form
    #request.form returns a object similar format as request.files : {"title": xxx, "description": xxx}
    # print("current_user", current_user)
    uploaded_image = Post(
            user_id=current_user.id,
            description = data["description"],
            img_url = data["img_url"],
            )
    print('uploaded_video!!!!!!!!!!!!!!!!!', uploaded_image)
    #then add and commit to database, in this process the new video id and createdat, updated at will be generated
    db.session.add(uploaded_image)
    db.session.commit()

    # since the id, created at and updated at are new info, refresh() function is needed to send those info to the frontend
    # so that it knows which page to turn to . and then to update the time accordingly
    db.session.refresh(uploaded_image)
    print('uploaded_video.to_dict()', uploaded_image.to_dict())
    return  uploaded_image.to_dict()
