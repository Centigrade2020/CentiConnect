import { useState } from "react";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";
import "./AuthForm.css";

function Signup() {
  const [serverError, setServerError] = useState("");

  const signup = ({ username, email, password }, { setSubmitting }) => {};

  return (
    <div className="AuthForm">
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <h1>Sign up</h1>

            <FormFieldClass.FormField
              label="Username"
              name="username"
              type="text"
            />
            <FormFieldClass.FormField label="Email" name="email" type="email" />
            <FormFieldClass.FormField
              label="Password"
              name="password"
              type="password"
            />
            <FormFieldClass.FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />

            <button
              className="authButton"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              Sign up
            </button>
            <div className="serverErrorContainer">
              <FormFieldClass.ServerError serverError={serverError} />
            </div>
            <div className="authLinkContainer">
              <p>
                Already have an account? <a className="authLink">Login</a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
