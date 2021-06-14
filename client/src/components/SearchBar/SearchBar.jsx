import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import fb from "../../services/firebase";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
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
        <div className="searchListContainer">
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
                    fb.firestore
                      .collection("root")
                      .doc("uid")
                      .get()
                      .then((doc) => {
                        const users = doc.data().users;
                        for (var i in users) {
                          if (users[i].username === name) {
                            console.log(users[i].username, users[i].userId);
                            history.push(`/user/${users[i].username}`, {
                              uid: users[i].userId,
                            });
                          }
                        }
                      });
                    setSearchTerm("");
                  }}
                >
                  <div className="imageContainer">
                    <img src="" alt="" />
                  </div>
                  <p>{name}</p>
                </button>
              ))}
          </ul>
        </div>
      );
    }
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
      {dynamicSearch()}
    </div>
  );
}

export default SearchBar;
