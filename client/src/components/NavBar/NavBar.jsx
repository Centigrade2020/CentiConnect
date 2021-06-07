import { useHistory } from "react-router";
import fb from "../../services/firebase";
import "./NavBar.css";

function NavBar() {
  const history = useHistory();

  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1>Connect</h1>
        </div>
        <div
          className="logout"
          onClick={() => {
            fb.auth.signOut();
            localStorage.clear();
            history.push("login");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default NavBar;
