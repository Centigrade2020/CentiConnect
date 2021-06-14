import * as yup from "yup";

const emailInitialValues = {
  newEmail: "",
  confirmNewEmail: "",
  password: "",
};

const emailValidationSchema = yup.object().shape({
  newEmail: yup.string().required("Required").email("Invalid email"),
  confirmNewEmail: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("newEmail"), null], "Emails must match"),
  password: yup.string().required("Required"),
});

export { emailInitialValues, emailValidationSchema };
