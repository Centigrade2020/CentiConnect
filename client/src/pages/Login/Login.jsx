import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";

function Login() {
  const history = useHistory();

  const [serverError, setServerError] = useState("");

  const login = ({ password }, { setSubmitting }) => {};

  return (
    <div className="AuthForm">
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <h1>Log in to your account</h1>

            <FormFieldClass.FormField label="Email" name="email" type="email" />
            <FormFieldClass.FormField
              label="Password"
              name="password"
              type="password"
            />

            <button
              className="authButton"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              Log in
            </button>
            <div className="serverErrorContainer">
              <FormFieldClass.ServerError serverError={serverError} />
            </div>
            <div className="authLinkContainer">
              <p>
                Don't have an account?{" "}
                <a
                  className="authLink"
                  onClick={() => {
                    history.push("signup");
                  }}
                >
                  Signup
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
