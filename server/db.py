from firebase_admin.auth import get_users
from services import firebase as fb


def upload_to_storage(fn, filepath):
    im = fb.bucket.blob(f'postImages/{fn}.jpeg')
    im.upload_from_filename(filepath)


def create_user(email, password, username):
    try:
        user = fb.auth.create_user(email=email, password=password)
        fb.firestore.collection("users").document(user.uid).set({
            "username": username,
            "privacy": False
        })
        fb.firestore.collection("root").document("AdditionalData").update({
            "usernames": fb.functions.ArrayUnion([username])
        })
        return {"uid": f"{user.uid}", "loggedIn": True}
    except BaseException as e:
        return({"error": f"{e.code}"})


def new_post(username, caption, postId):
    fb.firestore.collection('posts').document(postId).set({
        "postId": postId,
        "username": username,
        "imageId": "",
        "caption": caption,
        "comments": {},
        "upvotes": 0,
        "downvotes": 0
    })


def remove_post(imageId):
    fb.firestore.collection('posts').document(imageId).delete()


def get_user(email):
    user = fb.auth.get_user_by_email(email)
    return user if user else None
