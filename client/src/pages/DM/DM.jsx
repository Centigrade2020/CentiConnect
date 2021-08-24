import { useEffect, useState, useRef, createRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import fb from "../../services/firebase";
import { Symbols, DMMessageElement } from "../../components";
import "./DM.css";

function DM() {
  const [addChat, setAddChat] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [connections, setConnections] = useState([]);
  const [DMAdded, setDMAdded] = useState([]);

  const dummy = useRef();

  const [query, setQuery] = useState("");

  const [Messages] = useCollectionData(query, { idField: "id" });
  const [currentMessage, setCurrentMesage] = useState("");

  function scrollToBottom() {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("DMChatId")) {
      await fb.firestore
        .collection("DM")
        .doc(localStorage.getItem("DMChatId"))
        .collection("Messages")
        .add({
          text: currentMessage,
          createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
          uid: localStorage.getItem("userId"),
        });
      setCurrentMesage("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (localStorage.getItem("userId")) {
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
    if (localStorage.getItem("DMUserId")) {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("DMUserId"))
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
          .child(`profileImages/${localStorage.getItem("DMUserId")}.jpeg`)
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
      if (localStorage.getItem("DMChatId") !== "") {
        if (!unmounted) {
          setQuery(
            fb.firestore
              .collection("DM")
              .doc(localStorage.getItem("DMChatId"))
              .collection("Messages")
              .orderBy("createdAt")
              .limit(25)
          );
        }
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

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

          var myTimestamp = fb.firebase.firestore.Timestamp.fromDate(
            new Date()
          );

          if (!DMAdded.includes(userId)) {
            var fbDoc = fb.firestore.collection("DM").doc();
            fbDoc.set({
              MembersUID: [userId, localStorage.getItem("userId")],
              Messages: [],
            });
            fbDoc
              .collection("Messages")
              .doc()
              .set({
                createdAt: myTimestamp,
                text: "Conversation started",
                uid: localStorage.getItem("userId"),
              });

            console.log(fbDoc.id);

            fb.firestore
              .collection("users")
              .doc(userId)
              .update({
                DMAdded: fb.firebase.firestore.FieldValue.arrayUnion(
                  localStorage.getItem("userId")
                ),
                DMUidList: fb.firebase.firestore.FieldValue.arrayUnion({
                  userId: localStorage.getItem("userId"),
                  chatId: fbDoc.id,
                }),
              });

            fb.firestore
              .collection("users")
              .doc(localStorage.getItem("userId"))
              .update({
                DMAdded: fb.firebase.firestore.FieldValue.arrayUnion(userId),
                DMUidList: fb.firebase.firestore.FieldValue.arrayUnion({
                  userId: userId,
                  chatId: fbDoc.id,
                }),
              });

            if (localStorage.getItem("userId") !== "") {
              fb.firestore
                .collection("users")
                .doc(localStorage.getItem("userId"))
                .get()
                .then((doc) => {
                  setConnections(doc.data().connections);
                  setDMAdded(doc.data().DMAdded);
                });
            }
          }

          localStorage.setItem("DMUserId", content.DMuserId);
          if (localStorage.getItem("userId") !== "") {
            fb.firestore
              .collection("users")
              .doc(localStorage.getItem("userId"))
              .get()
              .then((doc) => {
                for (var i in doc.data().DMUidList) {
                  if (content.DMuserId === doc.data().DMUidList[i].userId) {
                    localStorage.setItem(
                      "DMChatId",
                      doc.data().DMUidList[i].chatId
                    );
                  }
                }
              })
              .then(() => {
                window.location.reload();
              });
          }

          setAddChat(false);
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
            {localStorage.getItem("DMUserId") ? (
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
                <div className="DMMessages">
                  {Messages &&
                    Messages.map((obj, key) => (
                      <DMMessageElement key={key} object={obj} />
                    ))}
                  <span ref={dummy}></span>
                </div>
                <form className="DMEnterMessageTab" onSubmit={sendMessage}>
                  <input
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => {
                      setCurrentMesage(e.target.value);
                    }}
                    value={currentMessage}
                  />
                  <button type="submit">Send</button>
                </form>
              </>
            ) : (
              <div className="DMDummyChatWrapper">
                <div>
                  <Symbols.Message size="120" />
                </div>
                <p>Start a conversation with your friend</p>
                <button
                  onClick={() => {
                    setAddChat(true);
                  }}
                >
                  Send Message
                </button>
              </div>
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
