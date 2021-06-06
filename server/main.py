import pyrebase

from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from services import firebase as fb

app = Flask(__name__)
ma = Marshmallow(app)

def create_user(email, password, username):
    user = fb.auth.create_user(email=email, password=password)
    fb.firestore.collection("users").document(user.uid).set({
        "username": username,
    })

@app.route("/get", methods=['GET'])
def home():
    return jsonify({
        "Hello": "World",
    })


if __name__ == "__main__":
    print(create_user("dummy@123.com", "Dharun@123", "dharunvs"))