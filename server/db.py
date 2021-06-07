from services import firebase as fb


def upload_to_storage():
    image = fb.bucket.blob('/')
    image_path = 'IMG_0182.jpg'
    image = fb.bucket.blob('image')
    image.upload_from_filename(image_path)


def create_user(email, password, username):
    try:
        user = fb.auth.create_user(email=email, password=password)
        fb.firestore.collection("users").document(user.uid).set({
            "username": username,
        })
        return {"uid": f"{user.uid}", "loggedIn": True}
    except BaseException as e:
        return({"error": f"{e.code}"})


def new_post(uid, imageId, content, description):
    fb.firestore.collection('posts').document(imageId).set({
        "username": uid,
        "imageId": imageId,
        "content": content,
        "description": description,
    })

    '''
    {
        "uid":"xxxx",
        "pic_id":"yyyy",
        "description":"",
        "interactions":"",
    }
    '''


def remove_post(imageId):
    fb.firestore.collection('posts').document(imageId).delete()


def get_user(uid):
    pass


# if __name__ == "__main__":
#     print("hello")
