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
        # data = create_user(
        #     content["email"], content["password"], content["username"])
        try:
            user = fb.auth.create_user(content["email"], content["password"])
            fb.firestore.collection("users").document(user.uid).set({
                "username": content["username"],
                "private": False,
                "about": ""
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
        # new_post(content["username"], content["caption"], content["postId"])
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
            "uuid" : id
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



@ app.route("/")
def index():
    return jsonify({
        "Hello": "World"
    })


if __name__ == "__main__":
    app.run(debug=True, port=4001)
