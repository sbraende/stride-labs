import { useEffect, useState } from "react";
import styles from "./Confirmation.module.css";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firestore.config";
import FormStyles from "../../styles/FormStyles.module.css";

const Confirmation = () => {
  const params = useParams();
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const order = await getDoc(doc(db, "orders", params.orderNumber));
        setOrderConfirmation(order.data());
      } catch (error) {
        console.error("Could not get order: ", error);
        setError("Could not confirm order, please contact us");
      }
    };
    getOrder();
  }, []);

  const displayDate = () => {
    return new Date(
      orderConfirmation.timestamp.seconds * 1000
    ).toLocaleTimeString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmationContent}>
        {orderConfirmation ? (
          <div className={styles.confirmationDetails}>
            <h3>Thanks for ordering!</h3>
            <p>Order number: {orderConfirmation.orderNumber}</p>
            <p>Order recived: {displayDate()}</p>
            <div className={styles.links}></div>
            <Link className={FormStyles.submitButton} to={"/myaccount/orders"}>
              View orders
            </Link>
            <Link className={FormStyles.link} to={"/"}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
        <p className="error">{error}</p>
      </div>
    </div>
  );
};

export default Confirmation;
