import { useEffect, useState } from "react";
import * as yup from "yup";
import fb from "../../services/firebase";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

var usernamesList = [];

function getUsernames() {
  fb.firestore
    .collection("root")
    .doc("AdditionalData")
    .get()
    .then((doc) => {
      sessionStorage.setItem("usernames", doc.data().usernames);
    });

  var str = sessionStorage.getItem("usernames");
  var usernames = str.split(",");

  return usernames;
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
  email: yup.string().required("Required").email("Invalid Email"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Must atleast be 6 characters"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export { initialValues, validationSchema };
