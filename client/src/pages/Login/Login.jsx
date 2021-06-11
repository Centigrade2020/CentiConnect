import { useState } from "react";
import { useHistory } from "react-router-dom";
import fb from "../../services/firebase";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";

function Login() {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError("Trouble logging in.");
        }
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setServerError("Invalid credentials");
        } else if (err.code === "auth/user-not-found") {
          setServerError("Email not registered");
        } else {
          setServerError("Something went wrong");
        }
      })
      .finally(() => {
        setSubmitting(false);
        localStorage.setItem("userId", fb.auth.currentUser?.uid);
        history.push("/");
      });
  };

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

            <FormFieldClass.FormField
              label="Email"
              name="email"
              type="email"
              autoComplete="on"
            />
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
                <span
                  className="authLink"
                  onClick={() => {
                    history.push("signup");
                  }}
                >
                  Signup
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
