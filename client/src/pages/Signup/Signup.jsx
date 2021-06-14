import { useState } from "react";
import { useHistory } from "react-router";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";
import "./AuthForm.css";
import fb from "../../services/firebase";

function Signup() {
  const history = useHistory();

  const [serverError, setServerError] = useState("");

  fb.firestore
    .collection("root")
    .doc("AdditionalData")
    .get()
    .then((doc) => {
      sessionStorage.setItem("usernames", doc.data().usernames);
    });

  const signup = async ({ username, email, password }, { setSubmitting }) => {
    const content = {
      username: username,
      email: email,
      password: password,
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          if (res.error === "ALREADY_EXISTS") {
            setServerError("Email already exists");
          } else {
            setServerError("Trouble signing up. Try again");
          }
          console.log(res.error);
        } else {
          fb.auth.signInWithEmailAndPassword(email, password);
          localStorage.setItem("userId", res.uid);
          history.push("login");
        }
      })
      .catch(() => {
        setServerError("Trouble signing up. Try again");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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
            <h1>Sign up your account</h1>

            <FormFieldClass.FormField
              label="Username"
              name="username"
              type="text"
            />
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
                Already have an account?{" "}
                <span
                  className="authLink"
                  onClick={() => {
                    history.push("login");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
