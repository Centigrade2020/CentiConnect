import pyrebase

from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from services import firebase

app = Flask(__name__)

ma = Marshmallow(app)

@app.route("/get", methods=['GET'])
def home():
    return jsonify({
        "Hello": "World",
    })


if __name__ == "__main__":
    print(Marshmallow)
    app.run(debug=True)