import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fb from "../../services/firebase";

function SearchElement({ userId, username }) {
  const history = useHistory();

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    let unmounted = false;
    if (userId !== "") {
      try {
        fb.storage
          .ref()
          .child(`profileImages/${userId}.jpeg`)
          .getDownloadURL()
          .then((data) => {
            if (!unmounted) {
              setProfilePic(data);
            } else {
              setProfilePic("");
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
    <button
      className="searchResult"
      key={userId}
      onClick={() => {
        localStorage.setItem("searchUser", userId);
        userId === localStorage.getItem("userId")
          ? history.push("/profile")
          : history.push(`/user/${username}`);
        window.location.reload();
      }}
    >
      <div className="imageContainer">
        {profilePic !== "" && <img src={profilePic} alt={username} />}
      </div>
      <p>{username}</p>
    </button>
  );
}

export default SearchElement;
