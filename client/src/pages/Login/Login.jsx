import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "./formikConfig";
import { FormFieldClass } from "../../components";

function Login() {
  const history = useHistory();

  const [serverError, setServerError] = useState("");

  const login = async ({ email, password }, { setSubmitting }) => {
    const content = {
      email: email,
      password: password,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    // .then((res) => {
    //   return res.json();
    // })
    // .then((res) => {
    //   if (res.error) {
    //     if (res.error === "ALREADY_EXISTS") {
    //       setServerError("Email already exists");
    //     } else {
    //       setServerError("Trouble signing up. Try again");
    //     }
    //   } else {
    //     localStorage.setItem("userId", res.uid);
    //   }
    // })
    // .catch(() => {
    //   setServerError("Trouble signing up. Try again");
    // })
    // .finally(() => {
    //   setSubmitting(false);
    // });
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
