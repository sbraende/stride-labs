import styles from "./ForgotPassword.module.css";
import formStyles from "../../styles/FormStyles.module.css";
import RequiredField from "../../components/RequiredField/RequiredField";
import { Link } from "react-router-dom";
import { auth } from "@/config/auth.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import useForgotPasswordValidation from "../../hooks/useForgotPasswordValidation";

const ForgotPassword = () => {
  // Hooks
  const [email, setEmail] = useState("");
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const [validationFailedMessage, setValidationFailedMessage] = useState("");

  const { validateForgotPassword, forgotPasswordErrors } =
    useForgotPasswordValidation();

  // Logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForgotPassword(email)) return;

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
      setValidationFailedMessage("Something went wrong. Try again");
      return;
    }
    setIsResetEmailSent(true);
  };

  // Markup
  return (
    <div className={formStyles.formContainer}>
      <form noValidate className={formStyles.form} onSubmit={handleSubmit}>
        <h2 className={formStyles.title}>Reset password</h2>
        <fieldset className={formStyles.fieldset}>
          <p>Type your email to reset your password</p>
          <div className={formStyles.formGroup}>
            <label htmlFor="email">
              Email address <RequiredField />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              maxLength={80}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationFailedMessage("");
                setIsResetEmailSent(false);
              }}
            />
            {forgotPasswordErrors && (
              <p className="error">{forgotPasswordErrors.email}</p>
            )}
          </div>
          {validationFailedMessage && (
            <p className="error">{validationFailedMessage}</p>
          )}
        </fieldset>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isResetEmailSent}
        >
          Continue
        </button>
        {isResetEmailSent && (
          <p className={formStyles.informationText}>
            If an account is associated with this email address, you will
            receive an email with a link to reset your password.
          </p>
        )}
        <Link className={formStyles.link} to={"/signin"}>
          Back to login
        </Link>
      </form>
    </div>
  );
};
export default ForgotPassword;
