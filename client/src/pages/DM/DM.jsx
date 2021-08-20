import { useEffect, useState } from "react";
import fb from "../../services/firebase";
import { Symbols, AddChat } from "../../components";
import "./DM.css";

function DM() {
  const [addChat, setAddChat] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [userId, setUserId] = useState("XSHgxXWYMhRmHprfJpLYOHW18923");

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
          </div>
        </div>
      )}
    </>
  );
}

export default DM;
