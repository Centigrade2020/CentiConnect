function DMMessageElement({ object }) {
  if (object.createdAt !== null) {
    var datetime = object.createdAt.toDate().toLocaleTimeString().split(" ");
    var timestamp = datetime[0].slice(0, 5) + " " + datetime[1];
  } else {
    var timestamp = "";
  }

  return (
    <div
      className={
        object.uid === localStorage.getItem("userId")
          ? "DMMessageElementSent"
          : "DMMessageElementReceived"
      }
    >
      <p>{object.text}</p>
      <span className="dateTime">{timestamp}</span>
    </div>
  );
}

export default DMMessageElement;
