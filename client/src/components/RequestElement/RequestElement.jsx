import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Symbols } from "../../components";
import fb from "../../services/firebase";

function RequestElement({ userId }) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    let unmounted = false;
    if (userId !== "") {
      fb.firestore
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (!unmounted) {
            setUsername(doc.data().username);
          } else {
            console.log("");
          }
        });

      try {
        fb.storage
          .ref()
          .child(`profileImages/${userId}.jpeg`)
          .getDownloadURL()
          .then((data) => {
            if (!unmounted) {
              setProfilePic(data);
            } else {
              console.log("");
            }
          });
      } catch {
        console.log("");
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const acceptHandler = () => {
    fb.firestore
      .collection("users")
      .doc(localStorage.getItem("userId"))
      .update({
        connections: fb.firebase.firestore.FieldValue.arrayUnion(userId),
      });
    fb.firestore
      .collection("users")
      .doc(userId)
      .update({
        connections: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
    fb.firestore
      .collection("users")
      .doc(localStorage.getItem("userId"))
      .update({
        requests: fb.firebase.firestore.FieldValue.arrayRemove(userId),
      });
    window.location.reload();
  };

  return (
    <li>
      <div className="profileImageContainer">
        <img src={profilePic} alt="profileimage" />
      </div>
      <div className="requestElementInfo">
        <p>{username}</p>
        <button className="checkProfileButton">
          <p>Check</p>
          <Symbols.Person size="25" />
        </button>
      </div>
      <div className="buttonsLists">
        <button className="acceptButton" onClick={acceptHandler}>
          Accept
        </button>
        <button className="denyButton">Deny</button>
      </div>
    </li>
  );
}

export default RequestElement;
