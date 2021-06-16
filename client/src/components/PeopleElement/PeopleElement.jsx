import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fb from "../../services/firebase";

function PeopleElement({ userId }) {
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

  return (
    <li
      onClick={() => {
        localStorage.setItem("searchUser", userId);
        userId === localStorage.getItem("userId")
          ? history.push("/profile")
          : history.push(`/user/${username}`);
        window.location.reload();
      }}
    >
      <div className="profileImageContainer">
        <img src={profilePic} alt="profileimage" />
      </div>
      <p>{username}</p>
    </li>
  );
}

export default PeopleElement;
