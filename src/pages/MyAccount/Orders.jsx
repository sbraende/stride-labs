import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import styles from "./Orders.module.css";
import { db } from "../../../firestore.config";
import { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";

const Orders = () => {
  const { user } = getAuthContext();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const getOrders = async () => {
      const orders = await getDocs(
        query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        )
      );
      setUserOrders([]);
      orders.forEach((docRef) => {
        setUserOrders((prevUserOrders) => [...prevUserOrders, docRef.data()]);
      });
    };
    getOrders();
  }, [user]);

  const displayOrderDetails = (order) => {
    const brand = order.order.map((order) => (
      <p
        key={crypto.randomUUID()}
      >{`${order.count} x ${order.product.brand} ${order.product.name}`}</p>
    ));
    return brand;
  };

  return (
    <div className={styles.orders}>
      <h2>Orders</h2>
      <ul className={styles.ordersList}>
        {userOrders.map((order) => {
          return (
            <li key={String(order.orderNumber)} className={styles.ordersItem}>
              <img src={null} alt="" />
              <p>
                <strong>Order number:</strong> {order.orderNumber}
              </p>
              <p>Staus: {order.status}</p>
              <p>Cart: </p>
              {displayOrderDetails(order)}
              <span>Order total: {order.total}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Orders;
