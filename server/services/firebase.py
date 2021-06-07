import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore, auth, storage

cred = credentials.Certificate("services/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)

firestore = firestore.client()
auth = auth
storage = storage.bucket()