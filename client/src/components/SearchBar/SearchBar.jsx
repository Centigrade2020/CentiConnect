import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
  const uid = localStorage.getItem("userId");
  const { handle } = useParams()
  function getUsernames() {
    if (!!sessionStorage.getItem("usernames")) {
      var str = sessionStorage.getItem("usernames");
      var usernames = str.split(",");
      return usernames;
    }
    return [];
  }

  const [searchTerm, setSearchTerm] = useState("");

  function editSearchTerm(e) {
    var value = e.target.value;
    setSearchTerm(value.split(/\s/).join(""));
  }

  function dynamicSearch() {
    if (searchTerm !== "" && searchTerm.length >= 1) {
      return (
        <ul className="searchList" id="searchList">
          {getUsernames()
            .filter((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((name) => (
              <button
                className="searchResult"
                key={name}
                onClick={() => {
                  history.push(uid);
                }}
              >
                <div className="imageContainer">
                  <img src="" alt="" />
                </div>
                <p>{name}</p>
              </button>
            ))}
        </ul>
      );
    }

    return (
      <ul className="searchList" id="searchList">
        <li className="searchResultNoUsers">No users</li>
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
        className="searchInput"
      />
      <div className="searchListContainer">{dynamicSearch()}</div>
    </div>
  );
}

export default SearchBar;
