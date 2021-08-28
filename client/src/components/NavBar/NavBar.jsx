import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fb from "../../services/firebase";
import SearchBar from "../SearchBar/SearchBar";
import { Symbols } from "../../components";
import "./NavBar.css";

function NavBar() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [messagesCount, setMessagesCount] = useState(0);
  const [DMAdded, setDMAdded] = useState([]);

  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          if (doc.data() !== undefined) {
            setUsername(doc.data().username);
          } else {
            setUsername("");
          }
        });

      try {
        fb.storage
          .ref()
          .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
          .getDownloadURL()
          .then((data) => setProfilePic(data))
          .catch(() => {
            "";
          });
      } catch {
        setProfilePic("");
      }

      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          for (var i in doc.data().DMCount) {
            setMessagesCount(messagesCount + doc.data().DMCount[i]);
          }
        });
    }
  }, []);

  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1
            onClick={() => {
              history.push("/");
            }}
          >
            Connect
          </h1>
        </div>

        {/* <div className="searchContainer">
          <SearchBar />
        </div> */}

        <div className="profileContainer">
          <div
            className="chatContainer"
            onClick={() => {
              history.push("/DM");
            }}
          >
            <Symbols.Chat size="28" />
            {messagesCount > 0 && (
              <div className="chatNo">
                <p>{messagesCount}</p>
              </div>
            )}
          </div>
          <p
            className="profileName"
            onClick={() => {
              history.push("/profile");
            }}
          >
            {username}
          </p>
          <div
            className="profilePicContainer"
            onClick={() => {
              history.push("/profile");
            }}
          >
            <img
              src={profilePic}
              alt=""
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
        </div>
      </div>
    </div>
  );
}

export default NavBar;
