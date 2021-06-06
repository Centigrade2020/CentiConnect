from flask import Flask, jsonify, request, json
from services import firebase as fb


app = Flask(__name__)


def Signup(email, password, username):
    try:
        user = fb.auth.create_user(email=email, password=password)
        fb.firestore.collection("users").document(user.uid).set({
            "username": username,
        })
        return {"uid": f"{user.uid}", "loggedIn": True}
    except BaseException as e:
        return({"error": f"{e.code}"})

def Login(email, password):
    user = fb.auth.get_user_by_email(email)
    user = fb.auth.get_user(user.uid)
    print(user.password)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    
    if request.method == "POST":
        content = request.get_json()
        data = signup()(content["email"], content["password"], content["username"])
        return jsonify(data)
    else:
        return {}

@app.route("/login", methods=["GET", "POST"])
def login():
    
    if request.method == "POST":
        content = request.get_json()
        Login(content["email"], content["password"])
        return {}
    else:
        return {}


if __name__ == "__main__":
    app.run(debug=True, port=4001)
