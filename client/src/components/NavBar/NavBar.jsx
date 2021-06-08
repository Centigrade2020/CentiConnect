import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1>Connect</h1>
        </div>
        <div className="searchContainer">
          <SearchBar />
        </div>
        <div className="profileContainer">
          <p className="profileName">username</p>
          <img
            className="profilePicContainer"
            onClick={() => {
              const profileTab = document.getElementById("ProfileTab");
              profileTab.classList.toggle("ProfileTabActive");
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
