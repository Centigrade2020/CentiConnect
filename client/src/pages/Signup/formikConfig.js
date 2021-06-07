import * as yup from "yup";

const initialValues = {
  username: "adsf",
  email: "dharunsivakumar002@gmail.com",
  password: "dharun",
  confirmPassword: "dharun",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required")
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
