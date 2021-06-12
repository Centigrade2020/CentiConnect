import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

try {
  const getapi = async (url) => {
    const response = await fetch(url);
    var data = await response.json();
    sessionStorage.setItem("firebase", JSON.stringify(data));
  };
  getapi("/getfirebase");
  const fbConfig = JSON.parse(sessionStorage.getItem("firebase"));

  firebase.initializeApp({
    apiKey: fbConfig.e7288ad4b8754f4ab36e46739d7d7d5c,
    authDomain: fbConfig.f001a98e1f1c46fbb130dc2c7f716ceb,
    projectId: fbConfig.c54ddc04c3e345e1a1ed23b3b230cac0,
    storageBucket: fbConfig.aab2710545a246a895c3011f2f2ebb45,
    messagingSenderId: fbConfig.ac88179503f34d1dbb69a2056d936dca,
    appId: fbConfig.f48d3029740a4910928863cad4ab864a,
    measurementId: fbConfig.b003a73e346040539ee2bf698f4d41a7,
  });
  sessionStorage.clear();
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
};

export default fb;
