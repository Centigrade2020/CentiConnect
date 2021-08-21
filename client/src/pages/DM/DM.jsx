import { useEffect, useState } from "react";
import fb from "../../services/firebase";
import { Symbols, DMAddChatPeopleElement } from "../../components";
import "./DM.css";

function DM() {
  const [addChat, setAddChat] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [connections, setConnections] = useState([]);

  const [DMUserId, setDMUserId] = useState("XSHgxXWYMhRmHprfJpLYOHW18923");

  // const [users, setUsers] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   fb.firestore
  //     .collection("root")
  //     .doc("uid")
  //     .get()
  //     .then((doc) => {
  //       setUsers(doc.data().users);
  //     });
  // }, []);

  // function editSearchTerm(e) {
  //   var value = e.target.value;
  //   setSearchTerm(value.split(/\s/).join(""));
  // }

  // function dynamicSearch() {
  //   if (searchTerm !== "" && searchTerm.length >= 1) {
  //     return (
  //       <div className="addChatPeopleContainer">
  //         {connections.length > 0 &&
  //           connections
  //             .filter((userObject) =>
  //               userObject.includes(searchTerm.toLowerCase())
  //             )
  //             .map((userObject, key) => {
  //               return (
  //                 <DMAddChatPeopleElement
  //                   key={key}
  //                   userId={userObject.userId}
  //                 />
  //               );
  //             })}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="addChatPeopleContainer">
  //         {users.length > 0 &&
  //           users
  //             .filter((userObject) =>
  //               userObject.username.includes(searchTerm.toLowerCase())
  //             )
  //             .map((userObject, key) => {
  //               return (
  //                 <DMAddChatPeopleElement
  //                   key={key}
  //                   userId={userObject.userId}
  //                 />
  //               );
  //             })}
  //       </div>
  //     );
  //   }
  // }

  useEffect(() => {
    let unmounted = false;
    if (localStorage.getItem("userId") !== "") {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          if (!unmounted) {
            setConnections(doc.data().connections);
          } else {
            console.log("");
          }
        });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (DMUserId !== "") {
      fb.firestore
        .collection("users")
        .doc(DMUserId)
        .get()
        .then((doc) => {
          if (!unmounted) {
            setUsername(doc.data().username);
          } else {
            console.log("");
          }
        });

      try {
        fb.storage
          .ref()
          .child(`profileImages/${DMUserId}.jpeg`)
          .getDownloadURL()
          .then((data) => {
            if (!unmounted) {
              setProfilePic(data);
            } else {
              console.log("");
            }
          });
      } catch {
        console.log("");
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className="People">
        <div className="peopleContainer">
          <div className="peopleContainerTab connections">
            <h1>
              Your chats
              <div
                className="addChat"
                onClick={() => {
                  setAddChat(true);
                }}
              >
                <Symbols.Compose size="30" />
              </div>
            </h1>
            <ul className="connectionsList"></ul>
          </div>
          <div className="peopleContainerTab requests">
            <div className="chatHeader">
              <div className="profileImageContainer">
                <img
                  src={profilePic}
                  alt="PI"
                  onDragStart={(e) => {
                    e.preventDefault();
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
              <p>{username}</p>
            </div>
          </div>
        </div>
      </div>
      {addChat && (
        <div className="AddChat">
          <div className="addChatContainer">
            <div className="addChatHeader">
              <h1>New message</h1>
              <div
                className="addChatClose"
                onClick={() => {
                  setAddChat(false);
                }}
              >
                <Symbols.Cross size="30" />
              </div>
            </div>

            {/* <div className="DMAddChatSearch">
              <input
                type="text"
                value={searchTerm}
                onChange={editSearchTerm}
                placeholder="Search"
                className="DMAddChatSearchInput"
              />
              {searchTerm.length > 0 && (
                <div
                  className="crossContainer"
                  onClick={() => setSearchTerm("")}
                >
                  <Symbols.Cross size="22" />
                </div>
              )}

              {searchTerm.length > 0 && dynamicSearch()}
            </div> */}

            {connections.map((value, key) => (
              <DMAddChatPeopleElement key={key} userId={value} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DM;
