import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore, auth, storage

cred = credentials.Certificate("services/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'centiconnect.appspot.com'

})

firestore = firestore.client()
auth = auth
bucket = storage.bucket()
