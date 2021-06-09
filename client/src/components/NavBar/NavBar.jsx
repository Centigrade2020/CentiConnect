import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import { useHistory } from "react-router";

function NavBar() {
  const history = useHistory();
  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1
            onClick={() => {
              history.push("");
            }}
          >
            {" "}
            Connect
          </h1>
        </div>
        <div className="searchContainer">
          <SearchBar />
        </div>
        <div className="profileContainer">
          <p
            className="profileName"
            onClick={() => {
              history.push("profile");
            }}
          >
            username
          </p>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
