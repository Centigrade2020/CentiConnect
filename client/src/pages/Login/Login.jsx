import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormField, ServerError } from "../../components/FormField";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {};

  return (
    <div className="Login">
      <h2 className="logo auth-logo">Forms</h2>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h1>Log in</h1>
          <Formik
            onSubmit={login}
            validateOnMount={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => (
              <Form>
                <FormField label="Email" name="email" autoComplete="on" />
                <FormField label="Password" name="password" type="password" />

                <button
                  className="auth-button"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  Log in
                </button>

                <div className="auth-link-container">
                  Don't have an account?
                  <span
                    className="auth-link"
                    onClick={() => {
                      history.push("signup");
                    }}
                  >
                    Sign Up
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

export default Login;
