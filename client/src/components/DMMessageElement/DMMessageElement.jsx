import React, { useRef, useState } from "react";

function DMMessageElement({ object }) {
  const dummy = useRef();
  return (
    <div
      className={
        object.uid === localStorage.getItem("userId")
          ? "DMMessageElementSent"
          : "DMMessageElementReceived"
      }
    >
      {object.text}
      <span ref={dummy}></span>
    </div>
  );
}

export default DMMessageElement;
