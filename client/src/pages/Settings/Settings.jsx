import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FormFieldClass } from "../../components";
import { initialValues, validationSchema } from "./formikConfig";
import { Symbols } from "../../components";
import fb from "../../services/firebase";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Settings.css";

function Settings() {
  const [profilePic, setProfilePic] = useState("");
  const [screen, setScreen] = useState("profile");

  const userDoc = fb.firestore
    .collection("users")
    .doc(localStorage.getItem("userId"));

  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      try {
        fb.storage
          .ref()
          .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
          .getDownloadURL()
          .then((data) => setProfilePic(data))
          .catch(() => {
            "";
          });
      } catch {
        setProfilePic("");
      }
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [finalFile, setFinalfile] = useState(null);
  const [result, setResult] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
  });

  const fileSelectHandler = (e) => {
    try {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    } catch {
      console.log("");
    }
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setResult(base64Image);
    setFinalfile(dataURItoBlob(base64Image));
    setSelectedFile(null);
  }

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const renderProfileScreen = () => {
    const saveChanges = ({ username, about }, { setSubmitting }) => {
      const content = {
        userId: localStorage.getItem("userId"),
        about: about,
        username: username,
      };

      if (!!finalFile) {
        fetch(`/updateprofilepic/${localStorage.getItem("userId")}`, {
          method: "POST",
          body: finalFile,
        });
      }

      fetch("/updateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      }).then(() => {
        setSubmitting(false);
        window.location.reload();
      });
    };
    return (
      <div className="profileScreen">
        <div className="profilePicContainer">
          <>
            <div className="input">
              <input
                type="file"
                accept="image/*"
                onChange={fileSelectHandler}
              />
              <div className="text">
                <Symbols.Image size="100" /> Select image
              </div>
            </div>

            {result ? (
              <img
                src={result}
                alt=" "
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
            ) : (
              <img
                src={profilePic}
                alt=" "
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
            )}
          </>
        </div>
        <Formik
          onSubmit={saveChanges}
          validateOnMount={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <h1>Username</h1>
              <FormFieldClass.FormField
                label="Username"
                name="username"
                type="text"
              />
              <h1>About</h1>
              <FormFieldClass.FormField
                label="About"
                name="about"
                type="text"
                as="textarea"
                rows="4"
              />

              <button
                className="saveButton"
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                Save changes
              </button>
              <div className="serverErrorContainer"></div>
            </Form>
          )}
        </Formik>
        {selectedFile && (
          <div className="cropContainer">
            <div className="cropWrapper">
              <div className="crop">
                <ReactCrop
                  src={selectedFile}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                />
              </div>
            </div>

            <button onClick={getCroppedImg}>Save</button>
          </div>
        )}
      </div>
    );
  };

  const renderEmailScreen = () => <div className="emailScreen">Email</div>;

  const renderPasswordScreen = () => (
    <div className="passwordScreen">Password</div>
  );

  const renderAccountScreen = () => (
    <div className="accountScreen">Account</div>
  );

  return (
    <div className="Settings">
      <div className="settingOptionContainer">
        <ul className="settingsLinks">
          <li
            className={screen == "profile" && "selectedSettingsLink"}
            onClick={() => {
              setScreen("profile");
            }}
          >
            Edit profile
          </li>
          <li
            className={screen == "email" && "selectedSettingsLink"}
            onClick={() => {
              setScreen("email");
            }}
          >
            Change email
          </li>
          <li
            className={screen == "password" && "selectedSettingsLink"}
            onClick={() => {
              setScreen("password");
            }}
          >
            Change password
          </li>
          <li
            className={screen == "account" && "selectedSettingsLink"}
            onClick={() => {
              setScreen("account");
            }}
          >
            Delect Account
          </li>
        </ul>
      </div>
      <div className="settingsDisplay">
        {screen === "profile"
          ? renderProfileScreen()
          : screen === "email"
          ? renderEmailScreen()
          : screen === "password"
          ? renderPasswordScreen()
          : renderAccountScreen()}
      </div>
    </div>
  );
}

export default Settings;
