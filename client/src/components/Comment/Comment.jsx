import { useState } from "react";
import fb from "../../services/firebase";

function Comment({ userId, comment, keyName }) {
  const [username, setUsername] = useState("");

  fb.firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      setUsername(doc.data().username);
    });

  return (
    <div className="comment" key={keyName}>
      <h4>{username}</h4>
      <p>{comment}</p>
    </div>
  );
}

export default Comment;
