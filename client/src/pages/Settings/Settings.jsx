import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { FormFieldClass } from "../../components";
import {
  profileInitialValues,
  profileValidationSchema,
} from "./profileFormikConfig";
import { emailInitialValues, emailValidationSchema } from "./emailFormikConfig";
import { Symbols } from "../../components";
import fb from "../../services/firebase";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Settings.css";

function Settings() {
  const history = useHistory();

  const [serverEmailError, setServerEmailError] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [screen, setScreen] = useState("profile");
  const [warningCheckbox, setWarningCheckbox] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailForPasswordSent, setEmailForPasswordSent] = useState(false);

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
          initialValues={profileInitialValues}
          validationSchema={profileValidationSchema}
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

  const renderAccountScreen = () => {
    const deleteAccount = () => {
      fb.auth.signOut().then(() => {
        fetch(`/deleteuserdocuments/${localStorage.getItem("userId")}`).then(
          () => {
            localStorage.clear();
            sessionStorage.clear();
          }
        );
      });
    };

    return (
      <div className="accountScreen">
        <div className="changePasswordTab">
          <h1>Change password</h1>
          {emailForPasswordSent ? (
            <div className="emailMessage">
              <h1>
                <Symbols.Tick size="38" /> Email sent
              </h1>
              <p>
                Password reset email has been sent to
                <span className="settingsEmail"> {emailMessage} </span> <br />
                Follow the link in email to reset you password.
              </p>
            </div>
          ) : (
            <p className="message">
              To change your password, request a reset email by clicking the
              button below
            </p>
          )}

          <button
            disabled={emailForPasswordSent}
            onClick={() => {
              const email = fb.auth.currentUser.email;
              console.log("sent");

              fb.auth.sendPasswordResetEmail(email).then(() => {
                console.log("sent");
                setEmailMessage(`${email}`);
                setEmailForPasswordSent(true);
              });
            }}
            className="accSettingsButton"
          >
            Send reset email
          </button>
        </div>
        <div className="line"></div>
        <div className="deleteAccountTab">
          <h1>Delete account</h1>
          <div className="deleteAccountText">
            <h1>
              <Symbols.Warning size="38" /> Warning
            </h1>
            <p>
              Deleting your account is irreversible. All the posts you've posted
              and the comments will be removed. However the votes will not be
              removed in order to maintain the popularity of the post
            </p>
          </div>
          <div className="deleteAccountCheckBox">
            <label className="checkboxContainer">
              <input
                type="checkbox"
                onChange={() => {
                  setWarningCheckbox(!warningCheckbox);
                }}
              />
              <span className="checkmark"></span>
              Read the warning
            </label>
          </div>
          <button
            disabled={!warningCheckbox}
            onClick={deleteAccount}
            className="accSettingsButton"
          >
            Delete Account
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="Settings">
      <div className="settingsWrapper">
        <div className="settingOptionContainer">
          <ul className="settingsLinks">
            <li
              className={screen === "profile" ? "selectedSettingsLink" : ""}
              onClick={() => {
                setScreen("profile");
              }}
            >
              Profile
            </li>

            <li
              className={screen === "account" ? "selectedSettingsLink" : ""}
              onClick={() => {
                setScreen("account");
              }}
            >
              Account
            </li>
          </ul>
        </div>

        <div className="settingsDisplay">
          {screen === "profile" ? renderProfileScreen() : renderAccountScreen()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
