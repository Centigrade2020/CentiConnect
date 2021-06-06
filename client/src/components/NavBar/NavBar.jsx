import { useHistory, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1>Connect</h1>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
