import { useEffect, useState } from "react";
import fb from "../../services/firebase";

function DMAddChatPeopleElement({ userId }) {
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

  return (
    <div
      className="DMAddChatPeopleElement"
      key={userId}
      onClick={() => {
        console.log(userId);
      }}
    >
      <div className="DMAddChatPeopleElementImageContainer">
        {profilePic !== "" && <img src={profilePic} alt={username} />}
      </div>
      <p>{username}</p>
    </div>
  );
}

export default DMAddChatPeopleElement;
