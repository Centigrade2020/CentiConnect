function DMMessageElement({ object }) {
  return (
    <div
      className={
        object.userId === localStorage.getItem("userId")
          ? "DMMessageElementSent"
          : "DMMessageElementReceived"
      }
    >
      {object.text}
    </div>
  );
}

export default DMMessageElement;
