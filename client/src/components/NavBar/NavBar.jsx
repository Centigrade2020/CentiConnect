import { useHistory } from "react-router";
import "./NavBar.css";

function NavBar() {
  const history = useHistory();

  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1>Connect</h1>
        </div>
        <div className="profileContainer">
          <p className="profileName">username</p>
          <div
            className="profilePicContainer"
            onClick={() => {
              const profileTab = document.getElementById("ProfileTab");
              profileTab.classList.toggle("ProfileTabActive");
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
