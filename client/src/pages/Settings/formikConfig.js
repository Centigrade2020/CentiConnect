import * as yup from "yup";
import fb from "../../services/firebase";

function getProfileData() {
  try {
    fb.firestore
      .collection("users")
      .doc(localStorage.getItem("userId"))
      .get()
      .then((doc) => {
        localStorage.setItem("username", doc.data().username);
        localStorage.setItem("about", doc.data().about);
      });
    return {
      username: localStorage.getItem("username"),
      about: localStorage.getItem("about"),
    };
  } catch {
    return {
      username: "",
      about: ""
    }
  }

}

const initialValues = {
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required")
    .trim("No spaces")
    .lowercase("Lowercase only")
    .notOneOf(getUsernames(), "Already taken")
    .strict()
    .min(3, "Must atleast be 3 characters"),
});

export { initialValues, validationSchema };
