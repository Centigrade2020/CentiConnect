import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
  var usernames = ["dharunvs", "dharundds", "hrithik69"];

  const [searchTerm, setSearchTerm] = useState("");

  function editSearchTerm(e) {
    var value = e.target.value;
    setSearchTerm(value.split(/\s/).join(""));
  }

  function dynamicSearch() {
    if (searchTerm !== "" && searchTerm.length >= 3) {
      return (
        <ul className="searchList" id="searchList">
          {usernames
            .filter((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((name) => (
              <button
                className="searchResult"
                key={name}
                onClick={() => {
                  history.push("searchuser");
                }}
              >
                {name}
              </button>
            ))}
        </ul>
      );
    }

    return (
      <ul className="searchList" id="searchList">
        <li className="searchResult">No users</li>
      </ul>
    );
  }

  return (
    <div className="Search">
      <input
        type="text"
        value={searchTerm}
        onChange={editSearchTerm}
        placeholder="Search"
        className="search"
      />
      <div className="searchListContainer">{dynamicSearch()}</div>
    </div>
  );
}

export default SearchBar;
