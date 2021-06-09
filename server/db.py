from firebase_admin.auth import get_users
from services import firebase as fb


def upload_to_storage(image):
    image = fb.bucket.blob('/')
    image_path = "image"
    image = fb.bucket.blob('test')
    image.upload_from_filename(image_path)


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
        print(e)
        return({"error": f"{e.code}"})


def new_post(content, caption):
    fb.firestore.collection('posts').document().set({
        "postId": "",
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
