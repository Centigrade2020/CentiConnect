from flask import Flask, jsonify, request
import os
import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore, auth, storage

cred = credentials.Certificate("services/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'centiconnect.appspot.com'

})

functions = firestore
fbfirestore = firestore.client()
fbauth = auth
bucket = storage.bucket()


app = Flask(__name__)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        content = request.get_json()
        try:
            user = fbauth.create_user(
                email=content["email"], password=content["password"])
            fbfirestore.collection("users").document(user.uid).set({
                "username": content["username"],
                "private": False,
                "about": "",
                "post": []
            })
            fbfirestore.collection("root").document("AdditionalData").update({
                "usernames": functions.ArrayUnion([content["username"]])
            })

            with open("defaults/defaultProfile.jpeg", "rb") as r:
                data = r.read()
                with open(f"defaults/{user.uid}.jpeg", "wb") as w:
                    w.write(data)

            im = bucket.blob(f'profileImages/{user.uid}.jpeg')
            im.upload_from_filename(f"defaults/{user.uid}.jpeg")

            if os.path.exists(f"defaults/{user.uid}.jpeg"):
                os.remove(f"defaults/{user.uid}.jpeg")

            return jsonify({"uid": f"{user.uid}", "loggedIn": True})
        except BaseException as e:
            return jsonify({"error": f"{e.code}"})

    else:
        return {}


@app.route('/createpost', methods=["GET", "POST"])
def create_post():
    if request.method == "POST":
        content = request.get_json()
        fbfirestore.collection('posts').document(content["postId"]).set({
            "postId": content["postId"],
            "userId": content["userId"],
            "caption": content["caption"],
            "comments": [],
            "upvotes": 0,
            "downvotes": 0
        })
        fbfirestore.collection("users").document(content["userId"]).update({
            "posts": functions.ArrayUnion([content["postId"]])
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

        im = bucket.blob(f'postImages/{id}.jpeg')
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

        fbfirestore.collection("users").document(content["userId"]).update({
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

        fbfirestore.collection("posts").document(content["postId"]).update({
            "comments": functions.ArrayUnion([{
                "userId": content["userId"],
                "comment": content["comment"]
            }])
        })
        return {}
    else:
        return {}


@app.route("/getuserposts/<uid>", methods=["POST", "GET"])
def get_user_posts(uid):
    if request.method == "GET":
        user_doc = fbfirestore.collection(
            "users").document(uid).get().to_dict()
        try:
            user_posts = []
            for i in user_doc["posts"]:
                post = fbfirestore.collection(
                    "posts").document(i).get().to_dict()
                user_posts.append(post)
            return jsonify({
                "posts": user_posts,
                "noOfPost": len(user_posts)
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
        posts = fbfirestore.collection("posts").get()
        for i in posts:
            posts_list.append(i.to_dict())

        return jsonify({
            "posts": posts_list
        })
    else:
        return {}


@app.route("/updateprofilepic/<uid>", methods=["POST", "GET"])
def update_profile_pic(uid):
    if request.method == "POST":
        content = request.get_data()
        with open(f"defaults/{uid}.jpeg", "wb") as w:
            w.write(content)

        im = bucket.blob(f'profileImages/{uid}.jpeg')
        im.upload_from_filename(f"defaults/{uid}.jpeg")

        if os.path.exists(f"defaults/{uid}.jpeg"):
            os.remove(f"defaults/{uid}.jpeg")

        return {}
    else:
        return {}


@ app.route("/")
def index():
    return jsonify({
        "Centigrade": "CentiConnect",
        "Developed by": ["Dharundds", "DharunVS", "HrithikMJ"]
    })


if __name__ == "__main__":
    app.run(debug=True, port=4001)
