import { useEffect, useState } from "react";
import fb from "../../services/firebase";
import { Symbols } from "../../components";
import "./DM.css";

function DM() {
  const [addChat, setAddChat] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [connections, setConnections] = useState([]);
  const [DMAdded, setDMAdded] = useState([]);

  const [DMUserId, setDMUserId] = useState("");

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
            setDMAdded(doc.data().DMAdded);
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
  }, [DMUserId]);

  function DMAddChatPeopleElement({ userId }) {
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
      let unmounted = false;
      if (userId !== "") {
        fb.firestore
          .collection("users")
          .doc(userId)
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
            .child(`profileImages/${userId}.jpeg`)
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
      <div
        className="DMAddChatPeopleElement"
        key={userId}
        onClick={() => {
          const content = {
            DMuserId: userId,
            currentUserId: localStorage.getItem("userId"),
          };

          var proceed = true;

          while (proceed) {
            for (var i in DMAdded) {
              if (DMAdded[i] == userId) {
                proceed = false;
              }
            }
          }

          if (proceed) {
            console.log(content);
            fetch("/addChat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(content),
            }).then(() => {
              setDMUserId(content.DMuserId);
              setAddChat(false);
            });
          } else {
            setDMUserId(content.DMuserId);
            setAddChat(false);
          }
        }}
      >
        <div className="DMAddChatPeopleElementImageContainer">
          {profilePic !== "" && <img src={profilePic} alt={username} />}
        </div>
        <p>{username}</p>
      </div>
    );
  }

  return (
    <>
      <div className="People">
        <div className="peopleContainer">
          <div className="DMTab yourchats">
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
            <ul className="DMList"></ul>
          </div>

          <div className="DMTab DMmessages">
            {DMUserId !== "" ? (
              <>
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
                <div className="DMMessages">{}</div>
                <div className="DMEnterMessageTab">
                  <input type="text" placeholder="Message..." />
                  <button>Send</button>
                </div>
              </>
            ) : (
              <div className="DMDummyChatWrapper">Hello</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Chat Popup */}
      {/* Add Chat Popup */}
      {/* Add Chat Popup */}

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
