import styles from "./SignIn.module.css";
import formStyles from "../../styles/FormStyles.module.css";
import { useState } from "react";
import { auth } from "@/config/auth.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import RequiredField from "../../components/RequiredField/RequiredField";
import useSignInValidation from "../../hooks/useSignInValidation";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const navigate = useNavigate();
  const { validateSignIn, signInErrors } = useSignInValidation();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSignInData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateSignIn(signInData)) {
      console.log("Form not valid");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        signInData.email.trim(),
        signInData.password.trim()
      );
      navigate("/");
      setSignInData({
        email: "",
        password: "",
      });
      setSignInErrorMessage("");
    } catch (error) {
      console.error("Could not sign-in user", error);
      setSignInErrorMessage(
        "Something went wrong. Please verify your email and password and try again."
      );
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <form onSubmit={handleSignIn} noValidate className={formStyles.form}>
        <h2 className={formStyles.title}>Sign in</h2>
        <fieldset className={formStyles.fieldset}>
          <div className={formStyles.formGroup}>
            <label htmlFor="email">
              Email address <RequiredField />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              maxLength={80}
              onChange={handleInput}
              value={signInData.email}
            />
            {signInErrors && <p className="error">{signInErrors.email}</p>}
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="password">
              Password <RequiredField />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              maxLength={80}
              onChange={handleInput}
              value={signInData.password}
            />
            {signInErrors && <p className="error">{signInErrors.password}</p>}
          </div>
          {signInErrorMessage && <p className="error">{signInErrorMessage}</p>}
        </fieldset>
        <Link className={formStyles.link} to={"/forgotPassword"}>
          Forgot your password?
        </Link>
        <p>
          Not a member?{" "}
          <Link className={formStyles.link} to={"/signup"}>
            Sign up
          </Link>
        </p>
        <button type="submit" className={formStyles.submitButton}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignIn;
