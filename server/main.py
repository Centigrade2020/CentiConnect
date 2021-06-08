from flask import Flask, jsonify, request, json
from services import firebase as fb
from db import *

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
        data = new_post(content['username'], content['imageId'],
                        content['content'], content['description'])

        return jsonify(data)
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



@app.route("/")
def index():
    return jsonify({
        "Backend": "Flask",
        "Frontend": "React"
    })


if __name__ == "__main__":
    app.run(debug=True, port=4001)
   # upload_to_storage()
