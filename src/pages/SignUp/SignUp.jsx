import styles from "./SignUp.module.css";
import formStyles from "../../styles/FormStyles.module.css";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/config/auth.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/config/firestore.config";
import { Link, useNavigate } from "react-router";
import RequiredField from "../../components/RequiredField/RequiredField";
import useSignUpValidation from "../../hooks/useSignUpValidation";

const SignUp = () => {
  // Hooks
  const navigate = useNavigate();

  const [singUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpErrors, validateSignUpData } = useSignUpValidation();
  const [signUpError, setSignUpError] = useState("");

  // Logic
  const handleInput = (e) => {
    const { name, value } = e.target;

    setSignUpData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setSignUpError("");

    if (!validateSignUpData(singUpData)) {
      console.log("Form not valid");
      return;
    }

    try {
      // Create auth user
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        singUpData.email.trim(),
        singUpData.password.trim()
      );

      // Add user to database
      await setDoc(doc(db, "users", userCredentials.user.uid), {
        firstName: singUpData.firstName.trim(),
        lastName: singUpData.lastName.trim(),
        email: singUpData.email.trim(),
        timestamp: serverTimestamp(),
      });

      await sendEmailVerification(userCredentials.user);
      navigate("/verify-email");

      console.log("User signed up and Firestore document created.");
      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Sign up failed", error);
      setSignUpError(
        "Could not create account. Do you have an account already? If not, please try again."
      );
    }
  };

  // JSX markup
  return (
    <div className={formStyles.formContainer}>
      <form onSubmit={handleSignUp} noValidate className={formStyles.form}>
        <h2 className={formStyles.title}>Sign Up</h2>
        <fieldset className={formStyles.fieldset}>
          <div className={formStyles.formGroup}>
            <label htmlFor="firstName">
              First name <RequiredField />
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              maxLength={80}
              onChange={handleInput}
              value={singUpData.firstName}
            />
            {signUpErrors && <p className="error">{signUpErrors.firstName}</p>}
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="lastName">
              Last Name <RequiredField />
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              maxLength={80}
              onChange={handleInput}
              value={singUpData.lastName}
            />
            {signUpErrors && <p className="error">{signUpErrors.lastName}</p>}
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="email">
              Email <RequiredField />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              maxLength={80}
              onChange={handleInput}
              value={singUpData.email}
            />
            {signUpErrors && <p className="error">{signUpErrors.email}</p>}
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
              value={singUpData.password}
            />
            {signUpErrors && <p className="error">{signUpErrors.password}</p>}
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="confirmPassword">
              Confirm password <RequiredField />
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              maxLength={80}
              onChange={handleInput}
              value={singUpData.confirmPassword}
            />
            {signUpErrors && (
              <p className="error">{signUpErrors.confirmPassword}</p>
            )}
          </div>
          {signUpError && <p className="error">{signUpError}</p>}
        </fieldset>
        <button type="submit" className={formStyles.submitButton}>
          Create account
        </button>
        <Link className={formStyles.link} to={"/signin"}>
          Back to login
        </Link>
      </form>
    </div>
  );
};
export default SignUp;
