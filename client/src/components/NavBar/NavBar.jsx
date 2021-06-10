import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import { useHistory } from "react-router";
import {useEffect,useState} from "react";
import fb from "../../services/firebase"
function NavBar() {
  const history = useHistory();
  const [username,setusername] = useState("")
  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      const uid = localStorage.getItem("userId");
      var docRef = fb.firestore.collection("users").doc(uid);
      
      docRef.get().then((doc) => {
        setusername(doc.data().username)
        
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
        <div className="searchContainer">
          <SearchBar />
        </div>
        <div
          className="profileContainer"
          onClick={() => {
            history.push("profile");
          }}
        >
          <p className="profileName">{username}</p>
          <div className="profilePicContainer">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/centiconnect.appspot.com/o/postImages%2F63cd11a998da4ef38ca4967fdf64c88a.jpeg?alt=media&token=2ae5afcd-2e23-4a98-a98d-487980654099"
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
