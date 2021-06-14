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
        setUsername(doc.data().username);
      });

    fb.storage
      .ref()
      .child(`profileImages/${userId}.jpeg`)
      .getDownloadURL()
      .then((data) => setProfilePic(data))
      .catch(() => {
        console.log("");
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
