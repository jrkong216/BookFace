from app.models import db, User, environment, SCHEMA, Post, Comment, Like

# Adds a demo user, you can add other users here if you want

# like1 = Like(user_id = 1, post_id=1)
# like2 = Like(user_id = 2, post_id=1)
# like3 = Like(user_id = 3, post_id=1)
# like4 = Like(user_id = 1, post_id=2)
# like5 = Like(user_id = 1, post_id=3)


def seed_users():
    print("SEED USER POSTING")
    demo = User(
        email='demo@aa.io', password='password', first_name="Demo", last_name="User")
    marnie = User(
        email='marniemills@aa.io', password='password', first_name="Marnie", last_name="Mills")
    bobbie = User(
        email='bobbiemills@aa.io', password='password', first_name="Bobbie", last_name="Mills")


    # demo.likes.append(like1)
    # marnie.likes.append(like2)
    # bobbie.likes.append(like3)
    # demo.likes.append(like4)
    # demo.likes.append(like5)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    # post1 = Post(
    # user_id=1,
    # description="This is first post by Demo User 1 (user_id=1)",
    # img_url="https://img.freepik.com/free-photo/closeup-shot-cute-grey-kitty-isolated-white-background_181624-35013.jpg",
    # post_likes=[demo, marnie]
    # )

    # post2 = Post(
    # user_id=2,
    # description="This is first post by Marnie (user_id=2)",
    # img_url="https://allaboutcats.com/wp-content/uploads/2022/03/cat-eating-cat-food-compressed.jpg"
    # )

    # post3 = Post(
    # user_id=3,
    # description="This is first post by Bobbie 1 (user_id=3)",
    # img_url="https://st2.depositphotos.com/2166845/5890/i/450/depositphotos_58906929-stock-photo-cairn-terrier-puppy.jpg"
    # )

    # db.session.add(post1)
    # db.session.add(post2)
    # db.session.add(post3)
    # db.session.commit()




def seed_posts():
    print("SEED POST POSTING")

    post1 = Post(
    user_id=1,
    description="I saw Marnie's picture of her cat so I put up mine!",
    img_url="https://img.freepik.com/free-photo/closeup-shot-cute-grey-kitty-isolated-white-background_181624-35013.jpg"
    )

    post2 = Post(
    user_id=2,
    description="This is my cat posing with some food! Isn't she the cutest!",
    img_url="https://allaboutcats.com/wp-content/uploads/2022/03/cat-eating-cat-food-compressed.jpg"
    )

    post3 = Post(
    user_id=3,
    description="I just wanted to show my dog as a baby. He's the best :)",
    img_url="https://st2.depositphotos.com/2166845/5890/i/450/depositphotos_58906929-stock-photo-cairn-terrier-puppy.jpg"
    )


    # post1.likes.append(like1)
    # post1.likes.append(like2)
    # post1.likes.append(like3)
    # post2.likes.append(like4)
    # post3.likes.append(like5)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()

# like1 = [
#       likes.insert().values(
#         user_id = 1,
#         post_id =1
#       )
#     ]
# db.session.execute(like1)
# db.session.commit()

def seed_comments():
    comment1 = Comment(
        user_id=1,
        post_id=2,
        description="Your Cat is GOOOOOOORGEOUS!!!"
    )


    comment2 = Comment(
        user_id=2,
        post_id=3,
        description="WOW HE IS SO ADORABLE! PUPPYS ARE THE GREATEST!"
    )

    comment3 = Comment(
        user_id=3,
        post_id=1,
        description="CATTTTTTTTTTTT PICTUREEEEEEEEE"
    )

    db.session.add_all(
        [comment1,comment2,comment3])
    db.session.commit()

def seed_likes():

    like1 = Like(
        user_id=1,
        post_id=2
    )

    db.session.add(like1)
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
