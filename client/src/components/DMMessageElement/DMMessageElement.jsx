function DMMessageElement({ object }) {
  return (
    <div
      className={
        object.uid === localStorage.getItem("userId")
          ? "DMMessageElementSent"
          : "DMMessageElementReceived"
      }
    >
      {object.text}
    </div>
  );
}

export default DMMessageElement;
