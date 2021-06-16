import { useEffect, useState } from "react";
import { PeopleElement } from "../../components";
import { RequestElement } from "../../components";
import fb from "../../services/firebase";
import "./People.css";

function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    let unmounted = false;

    try {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          if (!unmounted) {
            console.log(doc.data().connections);
            setPeopleList(doc.data().connections);
          } else {
            console.log("");
          }
        });
    } catch {
      console.log("");
    }

    try {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          if (!unmounted) {
            console.log(doc.data().requests);
            setRequestList(doc.data().requests);
          } else {
            console.log("");
          }
        });
    } catch {
      console.log("");
    }

    return () => {
      unmounted = true;
    };
  }, [fb]);

  return (
    <div className="People">
      <div className="peopleContainer">
        <div className="peopleContainerTab connections">
          <h1>Your connections</h1>
          <ul className="connectionsList">
            {peopleList.length > 0 &&
              peopleList.map((id, key) => (
                <PeopleElement key={key} userId={id} />
              ))}
          </ul>
        </div>
        <div className="peopleContainerTab requests">
          <h1>Requests</h1>
          <ul className="requestsList">
            {requestList.length > 0 &&
              requestList.map((id, key) => (
                <RequestElement key={key} userId={id} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default People;
