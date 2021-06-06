import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid Email"),
  password: yup.string().required("Required"),
});

export { initialValues, validationSchema };
