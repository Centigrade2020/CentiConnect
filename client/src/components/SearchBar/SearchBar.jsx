import React, { useEffect, useState } from "react";
import { SearchElement, Symbols } from "../../components";
import fb from "../../services/firebase";
import "./SearchBar.css";

function SearchBar() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fb.firestore
      .collection("root")
      .doc("uid")
      .get()
      .then((doc) => {
        setUsers(doc.data().users);
      });
  }, []);

  function editSearchTerm(e) {
    var value = e.target.value;
    setSearchTerm(value.split(/\s/).join(""));
  }

  function dynamicSearch() {
    if (searchTerm !== "" && searchTerm.length >= 1) {
      return (
        <div className="searchListContainer">
          <ul className="searchList" id="searchList">
            {users.length > 0 &&
              users
                .filter((userObject) =>
                  userObject.username.includes(searchTerm.toLowerCase())
                )
                .map((userObject, key) => {
                  return (
                    <SearchElement
                      key={key}
                      username={userObject.username}
                      userId={userObject.userId}
                    />
                  );
                })}
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
      {searchTerm.length > 0 && (
        <div className="crossContainer" onClick={() => setSearchTerm("")}>
          <Symbols.Cross size="22" />
        </div>
      )}

      {searchTerm.length > 0 && dynamicSearch()}
    </div>
  );
}

export default SearchBar;
