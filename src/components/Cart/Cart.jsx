import styles from "./Cart.module.css";
import CartProduct from "../CartProduct/CartProduct";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { getCartContext } from "../../context/cartContext";

const Cart = ({ setDisplayCart }) => {
  const { cart } = getCartContext();
  const navigate = useNavigate();

  // Turn scrolling off on <body>
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCheckout = () => {
    navigate(`/checkout`);
    setDisplayCart(false);
  };

  const total = `£${cart
    .reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.count * cartItem.product.price,
      0
    )
    .toFixed(2)}`;

  return (
    <div className={styles.cart}>
      <div className={styles.cartContent}>
        <header className={styles.header}>
          <h3>Your cart</h3>
          <button onClick={() => setDisplayCart(false)}>
            <img src="/icons/xmark.svg" />
          </button>
        </header>
        <div className={styles.productList}>
          {cart.map((cartItem) => (
            <CartProduct
              key={crypto.randomUUID()}
              cartItem={cartItem}
              setDisplayCart={setDisplayCart}
            />
          ))}
        </div>
        <div className={styles.drawer}>
          <div className={styles.shippingContainer}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.totalContainer}>
            <span>
              <strong>Total</strong>
            </span>
            <span>
              <strong>{total}</strong>
            </span>
          </div>
          <div className={styles.checkoutContainer}>
            <Button onClick={handleCheckout}>Checkout</Button>
          </div>
          <div className={styles.continueShoppingContainer}>
            <button
              className={styles.continueShoppingButton}
              onClick={() => {
                setDisplayCart(false);
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
