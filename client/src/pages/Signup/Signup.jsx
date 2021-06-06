import { useState,useEffect } from "react";
import { useHistory } from "react-router";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";
import "./AuthForm.css";

function Signup() {
  const history = useHistory();

  const [serverError, setServerError] = useState("");

  const signup = ({ username, email, password }, { setSubmitting }) => {
    const content = {
      username: username,
      email: email,
      password: password,
    };
  
    const response = fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    if (response.ok) {
      console.log("signed up");
    }
  };
  //  useEffect(()=>{
  //    fetch('/signup').then(response => response.json())
  //  })

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
                Already have an account?{" "}
                <a
                  className="authLink"
                  onClick={() => {
                    history.push("login");
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
