import * as yup from "yup";
import fb from "../../services/firebase";

function getProfileData() {
  try {
    fb.firestore
      .collection("users")
      .doc(localStorage.getItem("userId"))
      .get()
      .then((doc) => {
        if (doc.data() !== undefined) {
          localStorage.setItem("username", doc.data().username);
          localStorage.setItem("about", doc.data().about);
        } else {
          localStorage.setItem("username", "");
          localStorage.setItem("about", "");
        }
      });
    return {
      username: localStorage.getItem("username"),
      about: localStorage.getItem("about"),
    };
  } catch {
    return {
      username: "",
      about: "",
    };
  }
}

const profileInitialValues = {
  username: getProfileData().username,
  about: getProfileData().about,
};

function getUsernames() {
  if (!!sessionStorage.getItem("usernames")) {
    var str = sessionStorage.getItem("usernames");
    var usernames = str.split(",");
    usernames = usernames.filter(function (ele) {
      return ele !== localStorage.getItem("username");
    });
    return usernames;
  }
  return [];
}

const profileValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required")
    .trim("No spaces")
    .lowercase("Lowercase only")
    .notOneOf(getUsernames(), "Already taken")
    .strict()
    .min(3, "Must atleast be 3 characters"),
});

export { profileInitialValues, profileValidationSchema };
