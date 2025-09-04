import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const placeholderImageUrl =
  "https://res.cloudinary.com/dyabzrdmr/image/upload/v1756992012/placeholder-image_flnjfp.jpg";

const ProductCard = ({ product }) => {
  // Handle cases where product data is incomplete or missing
  if (!product || !product.id || !product.variant || !product.variant[0]) {
    return (
      <li className={styles.productCard}>
        <div className={styles.link}>
          <div
            className={styles.productImage}
            style={{
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No image available
          </div>
          <h5 className={styles.title}>Product unavailable</h5>
          <div className={styles.detailsRow}>
            <span className={styles.price}>N/A</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.productCard}>
      <Link
        to={`/products/${product.id}?variant=${product.variant[0].id}`}
        className={styles.link}
      >
        <img
          src={product.imageURL || placeholderImageUrl}
          alt={product.name || "Placeholder image"}
          className={styles.productImage}
        />
        <h5 className={styles.title}>{`${product.brand || "Unknown Brand"} ${
          product.name || "Unknown Product"
        }`}</h5>
        <div className={styles.detailsRow}>
          <span className={styles.price}>
            {product.price
              ? `£${product.price.toFixed(2)}`
              : "Price unavailable"}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
