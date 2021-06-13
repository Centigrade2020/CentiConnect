import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import fb from "../../services/firebase";
function NavBar() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // const user = fb.auth.currentUser?.uid
  // console.log(user)

  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          setUsername(doc.data().username);
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
      //   try {
      //     console.log("hrithik69")
      //     fb.firestore
      //       .collection("root")
      //       .doc("uid")
      //       .collection("users")
      //       .doc("hrithik69")
      //       .get()
      //       .then((doc) => {

      //         if (doc.exists) {
      //           var data = doc.data()
      //           console.log(data)
      //         }
      //         else {
      //           console.log("hey")
      //         }
      //       })
      //   }
      //   catch {
      //     console.log("h")
      //   }
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
        <div className="searchContainer">
          <SearchBar />
        </div>
        <div
          className="profileContainer"
          onClick={() => {
            history.push("/" + "profile");
          }}
          title="profiletab"
        >
          <p className="profileName">{username}</p>
          <div className="profilePicContainer">
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
