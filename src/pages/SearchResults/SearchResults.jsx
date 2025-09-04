import styles from "./SearchResults.module.css";
import { useLocation } from "react-router";
import shoeList from "../../data/shoeData";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { API_URL } from "../../config/backend.config";

const SearchResults = () => {
  const [aiResults, setAiResults] = useState({
    recommendation: "",
    product: {},
  });
  const [error, setError] = useState({});

  // Get user query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userQuery = queryParams.get("q");

  useEffect(() => {
    if (!userQuery) return;

    const getAiResponse = async () => {
      try {
        const response = await fetch(`${API_URL}/api/chatgpt`, {
          method: "POST",
          body: JSON.stringify({ query: userQuery }),
          headers: { "Content-type": "application/json" },
        });
        const data = await response.json();

        setAiResults({
          recommendation: data.recommendation,
          product: data.product,
        });
      } catch (error) {
        console.error("Could not get reponse from Gemini:", error);
        setError("Error getting recommendation, please contact support");
      }
    };

    getAiResponse();
  }, [userQuery]);

  return (
    <div className={styles.searchResults}>
      <div className={styles.searchResultsContent}>
        {Object.keys(error).length === 0 ? (
          aiResults.recommendation ? (
            <>
              <h3>Our recommendation</h3>
              <p>{aiResults.recommendation}</p>
              {
                <ul className={styles.productList}>
                  <ProductCard product={aiResults.product} />
                </ul>
              }
            </>
          ) : (
            <p>Loading search results...</p>
          )
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
