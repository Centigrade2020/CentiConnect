import { useEffect, useState } from "react";
import fb from "../../services/firebase";
import { Symbols, DMMessageElement } from "../../components";
import "./DM.css";

function DM() {
  const [addChat, setAddChat] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [connections, setConnections] = useState([]);
  const [DMAdded, setDMAdded] = useState([]);

  const [DMUserId, setDMUserId] = useState("");
  const [DMChatId, setDMChatId] = useState("");

  const [messages, setMessages] = useState([]);

  const [currentMessage, setCurrentMesage] = useState("");

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

          if (!DMAdded.includes(userId)) {
            var fbDoc = fb.firestore.collection("DM").doc();
            fbDoc.set({
              MembersUID: [userId, localStorage.getItem("userId")],
              Messages: [],
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

          setDMUserId(content.DMuserId);
          if (localStorage.getItem("userId") !== "") {
            fb.firestore
              .collection("users")
              .doc(localStorage.getItem("userId"))
              .get()
              .then((doc) => {
                for (var i in doc.data().DMUidList) {
                  if (content.DMuserId === doc.data().DMUidList[i].userId) {
                    setDMChatId(doc.data().DMUidList[i].chatId);
                    fb.firestore
                      .collection("DM")
                      .doc(doc.data().DMUidList[i].chatId)
                      .get()
                      .then((doc) => {
                        setMessages(doc.data().Messages);
                      });
                  }
                }
              })
              .then(() => {});
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
                <div className="DMMessages">
                  {messages.map((value, key) => (
                    <DMMessageElement key={key} object={value} />
                  ))}
                </div>
                <form
                  className="DMEnterMessageTab"
                  onSubmit={(e) => {
                    e.preventDefault();
                    var myTimestamp = fb.firebase.firestore.Timestamp.fromDate(
                      new Date()
                    );
                    fb.firestore
                      .collection("DM")
                      .doc(DMChatId)
                      .update({
                        Messages: fb.firebase.firestore.FieldValue.arrayUnion({
                          userId: localStorage.getItem("userId"),
                          text: currentMessage,
                          datetime: myTimestamp,
                        }),
                      })
                      .then(() => {
                        fb.firestore
                          .collection("DM")
                          .doc(DMChatId)
                          .get()
                          .then((doc) => {
                            setMessages(doc.data().Messages);
                          });
                      });
                    setCurrentMesage("");
                  }}
                >
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
