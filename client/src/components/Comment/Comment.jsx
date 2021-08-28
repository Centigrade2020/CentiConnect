import { useState } from "react";
import fb from "../../services/firebase";

function Comment({ userId, comment, keyName }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  try {
    fb.firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.data() !== undefined) {
          setUsername(doc.data().username);
        } else {
          setUsername("user_deleted");
        }
      })
      .catch(() => {
        console.log("");
      });

    fb.storage
      .ref()
      .child(`profileImages/${userId}.jpeg`)
      .getDownloadURL()
      .then((data) => {
        setProfilePic(data);
      })
      .catch(() => {
        setProfilePic(
          "https://firebasestorage.googleapis.com/v0/b/centiconnect.appspot.com/o/profileImages%2FS3s5pz38yLMv4pInOZe5xzjROwx2.jpeg?alt=media&token=4999b47f-def8-456c-999b-87331c9221fc"
        );
      });

    return (
      <div className="comment" key={keyName}>
        <div className="commentProfilePicContainer">
          <img
            src={profilePic}
            alt="profileIcon"
            onDragStart={(e) => {
              e.preventDefault();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="commentText">
          <h4>{username}</h4>
          <p>{comment}</p>
        </div>
      </div>
    );
  } catch {
    return <span></span>;
  }
}

export default Comment;
