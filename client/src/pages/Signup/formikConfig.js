import * as yup from "yup";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function getUsernames() {
  if (!!sessionStorage.getItem("usernames")) {
    var str = sessionStorage.getItem("usernames");
    var usernames = str.split(",");
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
