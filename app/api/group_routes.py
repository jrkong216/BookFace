from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import db, Group, Post
from ..forms.create_group import CreateGroupForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

# ************************************************************************************************

Base=declarative_base()

group_bp = Blueprint("group_routes", __name__, url_prefix="/api/groups")

# ************************************ GROUP ROUTES ***********************************************
# *************************************************************************************************


# ************************************ GET ALL GROUPS ***********************************************

# Get all posts -working
@group_bp.route("/", methods=["GET"])
def get_all_group():
    all_groups = Group.query.all()
    # all_posts = Post.query.options(joinedload(Post.post_likes)).all()
    print("this is all_groups !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", all_groups)
    response = []
    print("DID THIS GET HERE?! ***************************************")
    if all_groups:
        for group in all_groups:
            group_obj = group.to_dict()
            response.append(group_obj)

        return{"Groups": response}, 200

    return {"Error":"404 Not Found"}, 404

# ************************************ CREATE NEW GROUP***********************************************

# Create new group
@group_bp.route("/new", methods = ["POST"])
# @login_required
def create_group():

    create_group_form = CreateGroupForm()
    create_group_form['csrf_token'].data = request.cookies['csrf_token']
    # print("this is current user.id", current_user.id)
    if create_group_form.validate_on_submit():
        group = Group()
        data = create_group_form.data
        group = Group(
                        name = data["name"],
                        description = data["description"],
                        user_id=current_user.id,
                        )

        db.session.add(group)
        db.session.commit()
        return group.to_dict(), 201

    return {"Error": "Validation Error"}, 401

## ****************************** EDIT GROUP ************************************

@group_bp.route("/<int:group_id>", methods=["PUT"])
def edit_comment(group_id):
    curr_group = Group.query.get(group_id)

    create_group_form = CreateGroupForm()
    create_group_form['csrf_token'].data = request.cookies['csrf_token']

    if create_group_form.validate_on_submit:
        data = create_group_form.data

        name=create_group_form.data["name"]
        description=create_group_form.data["description"]

        curr_group.description= description
        curr_group.name= name

        db.session.commit()

        return curr_group.to_dict(), 201
    return { "Error": "Validation Error" }, 401


# ************************************   DELETE GROUP BY GROUP ID   ******************************************************

# Delete like
@group_bp.route("/<int:group_id>/", methods=["DELETE"])
@login_required
def delete_group(group_id):

    group = Group.query.get(group_id)

    if group:
        db.session.delete(group)
        db.session.commit()

        return {"message" : "Group succesfully deleted"}, 200

    return {"Error": "404 Like Not Found"}, 404

#*****************************************************************************************************************************
