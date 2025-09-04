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

        // Handle cases where the API response structure is unexpected
        if (!data) {
          throw new Error('No data received from API');
        }

        setAiResults({
          recommendation: data.recommendation || 'No recommendation available',
          product: data.product || null,
        });
      } catch (error) {
        console.error("Could not get response from backend:", error);
        setError("Error getting recommendation. Please try a different search term or contact support.");
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
              {aiResults.product && (
                <ul className={styles.productList}>
                  <ProductCard product={aiResults.product} />
                </ul>
              )}
              {!aiResults.product && (
                <p>No specific product recommendation available for this search.</p>
              )}
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
