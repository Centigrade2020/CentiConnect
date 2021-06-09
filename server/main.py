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
        # content['image'].save("hello")
        # upload_to_storage(content['image'])
        print(content)

        # data = new_post(content['username'], content['imageId'],
        #                 content['content'], content['description'])
        # print(jsonify(data))
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


@ app.route('/images', methods=["POST", "GET"])
def images():
    if request.method == "POST":
        content = request.get_data()
        print(type(content))
        content.save("vs")
        # print(content)
        print(type(content))
        return {}

    return {}


@ app.route("/")
def index():
    return jsonify({
        "Hello": "World"
    })


if __name__ == "__main__":
    app.run(debug=True, port=4001)
   # upload_to_storage()
