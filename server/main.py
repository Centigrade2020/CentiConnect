from flask import Flask, jsonify, request, json
from services import firebase as fb
import os
from db import *
import uuid

app = Flask(__name__)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        content = request.get_json()
        data = create_user(
            content["email"], content["password"], content["username"])

        return jsonify(data)
    else:
        return {}


@app.route('/createpost', methods=["GET", "POST"])
def create_post():
    if request.method == "POST":
        content = request.get_json()
        new_post(content["username"], content["caption"], content["postId"])
        return {}
    else:
        return {}


@app.route('/deletepost', methods=["POST", "GET"])
def deletepost():
    if request.method == "POST":
        content = request.get_json()
        data = remove_post(content['imageId'])
        return jsonify(data)
    else:
        return {}


@ app.route('/images', methods=["POST", "GET", "PUT"])
def images():
    if request.method == "POST":
        content = request.get_data()

        id = str(uuid.uuid4()).split("-")
        id = "".join(id)

        with open(f"uploads/{id}.jpeg", "wb") as f:
            f.write(content)

        upload_to_storage(id, f"uploads/{id}.jpeg")
        
        if os.path.exists(f"uploads/{id}.jpeg"):
            os.remove(f"uploads/{id}.jpeg")
        
        return jsonify({
            "uuid" : id
        })

    else:
        return{}




@ app.route("/")
def index():
    return jsonify({
        "Hello": "World"
    })


if __name__ == "__main__":
    app.run(debug=True, port=4001)
