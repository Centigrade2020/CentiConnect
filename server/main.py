#import pyrebase

from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from services import firebase as fb

app = Flask(__name__)
ma = Marshmallow(app)


def create_user(email, password, username):
    user = fb.auth.create_user(email=email, password=password)
    fb.firestore.collection("users").document(user.uid).set({
        "username": username,
    })


@app.route("/signup", methods=['POST'])
def signup():
    content = request.get_json()
    print(content)
    return jsonify(content)


if __name__ == "__main__":
    app.run(debug=True, port=4001)
