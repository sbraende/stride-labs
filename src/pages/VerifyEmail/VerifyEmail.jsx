import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/auth.config";
import { sendEmailVerification } from "firebase/auth";
import useSignOut from "../../hooks/useSignOut";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerficationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/");
      }
    };

    const interval = setInterval(checkVerficationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      console.error("Error re-sending verification email:", error);
      setError("Could not re-send verificaiton email");
    }
  };

  return (
    <div className={styles.verifyEmail}>
      <div className={styles.verifyEmailContent}>
        <h2>Verify email</h2>
        {emailVerified ? (
          <p className="confirm">Email verified! Redirecting to home page...</p>
        ) : (
          <>
            <p>
              Please check your inbox and verify your email. After verifying
              your email you will be redirected to the main page.
            </p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={handleResendVerification}
              >
                Resend verification email
              </button>
            </div>
            <button className="link" onClick={useSignOut()}>
              Sign out of account
            </button>

            {emailSent && (
              <p className="confirm">
                New verification email has been sent. Please check your inbox
              </p>
            )}
            {error && <p className="error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
