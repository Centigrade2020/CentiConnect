import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [username, setUsername] = useState("");
  const history = useHistory();

  return (
    <div className="nav-container">
      <nav>
        <h1
          className="logo"
          onClick={() => {
            history.push("/");
          }}
        >
          Forms
        </h1>
        <div className="profile">
          <p className="profile-name">{username}</p>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
