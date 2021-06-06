import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormField, ServerError } from "../../components/FormField";
import "./Signup.css";

function Signup() {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const signup = ({ email, username, password }, { setSubmitting }) => {};

  return (
    <div className="Signup">
      <h2 className="logo auth-logo">Forms</h2>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h1>Sign up</h1>
          <Formik
            onSubmit={signup}
            validateOnMount={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <FormField label="Username" name="username" />
                <FormField label="Email" name="email" autoComplete="on" />
                <FormField label="Password" name="password" type="password" />
                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />

                <button
                  className="auth-button"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  Sign up
                </button>

                <div className="auth-link-container">
                  Already have an account?
                  <span
                    className="auth-link"
                    onClick={() => {
                      history.push("login");
                    }}
                  >
                    Login
                  </span>
                </div>
              </Form>
            )}
          </Formik>
          <ServerError serverError={serverError} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
