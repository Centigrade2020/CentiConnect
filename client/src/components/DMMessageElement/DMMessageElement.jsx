function DMMessageElement({ object }) {
  var datetime = object.createdAt.toDate().toLocaleTimeString().split(" ");
  var timestamp = datetime[0].slice(0, 5) + " " + datetime[1];

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
