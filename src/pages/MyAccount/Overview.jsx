import styles from "./Overview.module.css";
import { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firestore.config";
import useSignOut from "../../hooks/useSignOut";

const Overview = () => {
  const signOutUser = useSignOut();

  const { user } = getAuthContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getCurrentUserData = async () => {
      try {
        const currentUserDoc = await getDoc(doc(db, "users", user.uid));
        setUserData(currentUserDoc.data());
      } catch (error) {
        console.error("Failed to fetch user document:", error);
      }
    };
    getCurrentUserData();
  }, [user]);

  return (
    <div className={styles.myAccountContainer}>
      <h2>Account overview</h2>
      <div>
        {userData ? (
          <>
            <span>
              {`Hi ${userData.firstName} ${userData.lastName}. (Not ${userData.firstName} ${userData.lastName} `}
            </span>
            <button
              className={styles.signOutButton}
              onClick={signOutUser}
              disabled={!userData}
            >
              Logout
            </button>
            <span>{")"}</span>
          </>
        ) : (
          <p>Redirecting to 'sign in' page</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
