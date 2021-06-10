from flask import Flask, jsonify, request, json
from services import firebase as fb
import os
# from db import *
import uuid

app = Flask(__name__)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        content = request.get_json()
        try:
            user = fb.auth.create_user(content["email"], content["password"])
            fb.firestore.collection("users").document(user.uid).set({
                "username": content["username"],
                "private": False,
                "about": "",
                "post": []
            })
            fb.firestore.collection("root").document("AdditionalData").update({
                "usernames": fb.functions.ArrayUnion([content["username"]])
            })
            return jsonify({"uid": f"{user.uid}", "loggedIn": True})
        except BaseException as e:
            return jsonify({"error": f"{e.code}"})

    else:
        return {}


@app.route('/createpost', methods=["GET", "POST"])
def create_post():
    if request.method == "POST":
        content = request.get_json()
        fb.firestore.collection('posts').document(content["postId"]).set({
            "postId": content["postId"],
            "userId": content["userId"],
            "caption": content["caption"],
            "comments": [],
            "upvotes": 0,
            "downvotes": 0
        })
        fb.firestore.collection("users").document(content["userId"]).update({
            "posts": fb.functions.ArrayUnion([content["postId"]])
        })
        return {}
    else:
        return {}


@ app.route('/images', methods=["POST", "GET"])
def images():
    if request.method == "POST":
        content = request.get_data()

        id = str(uuid.uuid4()).split("-")
        id = "".join(id)

        with open(f"uploads/{id}.jpeg", "wb") as f:
            f.write(content)

        im = fb.bucket.blob(f'postImages/{id}.jpeg')
        im.upload_from_filename(f"uploads/{id}.jpeg")

        if os.path.exists(f"uploads/{id}.jpeg"):
            os.remove(f"uploads/{id}.jpeg")

        return jsonify({
            "uuid": id
        })

    else:
        return{}


@app.route('/updateprofile', methods=["POST", "GET"])
def update_user():
    if request.method == "POST":
        content = request.get_json()

        fb.firestore.collection("users").document(content["userId"]).update({
            "username": content["username"],
            "about": content["about"]
        })
        return {}
    else:
        return {}

@app.route("/postcomment", methods=["POST", "GET"])
def post_comment():
    if request.method == "POST":
        content = request.get_json()

        fb.firestore.collection("posts").document(content["postId"]).update({
            "comments": fb.functions.ArrayUnion([{
                "userId" : content["userId"],
                "comment" : content["comment"]
                }])
        })
        return {}
    else:
        return {}

@app.route("/getuserposts/<uid>", methods=["POST", "GET"])
def get_user_posts(uid):
    if request.method == "GET":
        user_doc = fb.firestore.collection("users").document(uid).get().to_dict()
        try:
            user_posts = []
            for i in user_doc["posts"]:
                post = fb.firestore.collection("posts").document(i).get().to_dict()
                user_posts.append(post)
            return jsonify({
                "posts": user_posts
            })
        except:
            return jsonify(({
                "posts": []
            }))
    else:
        return {}

@app.route("/getallposts", methods=["POST", "GET"])
def get_all_posts():
    if request.method == "GET":
        posts_list = []
        posts = fb.firestore.collection("posts").get()
        for i in posts:
            posts_list.append(i.to_dict())
            
        return jsonify({
            "posts": posts_list
        })
    else:
        return {}


@ app.route("/")
def index():
    return jsonify({
        "Centigrade": "CentiConnect",
        "Developed by": {"Dharundds", "DharunVS", "HrithikMJ"}
    })






if __name__ == "__main__":
    app.run(debug=True, port=4001)
