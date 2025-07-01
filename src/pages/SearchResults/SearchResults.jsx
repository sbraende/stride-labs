import styles from "./SearchResults.module.css";
import { useLocation } from "react-router";
import shoeList from "../../data/shoeData";
import { useEffect, useState } from "react";
// import { ai } from "../../../gemini.config";
// import { Type } from "@google/genai";
import ProductCard from "../../components/ProductCard/ProductCard";

const SearchResults = () => {
  const [aiResults, setAiResults] = useState({
    response: "",
    shoeId: "",
  });

  // Get query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userQuery = queryParams.get("q");

  useEffect(() => {
    if (!userQuery) return;

    setAiResults({ response: "", shoeId: "" });

    // Generate prompt
    const prompt = `
      You are a helpful member of our shoe shop team, providing personalized recommendations. When suggesting a shoe, please use "we" (e.g., "We would recommend...").

      Based on the following shoe inventory and the user's request, recommend one shoe that best fits their needs. Respond with a JSON object following this schema: { "response": "...", "shoeId": number }.

      Shoe Inventory:
      ${JSON.stringify(shoeList)}

      User Request:
      ${userQuery}
      `;

    const getAiRecommendedProduct = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                response: { type: Type.STRING },
                shoeId: { type: Type.STRING },
              },
              propertyOrdering: ["response", "shoeId"],
            },
          },
        });

        const responseData = JSON.parse(response.text);
        if (responseData.shoeId === "null") responseData.shoeId = null;

        setAiResults(responseData);
      } catch (error) {
        console.error("AI response falied: ", error);
        setAiResults({
          response:
            "We're having trouble generating a recommendation at the moment. Please try again later or browse our collection manually.",
          shoeId: null,
        });
      }
    };
    getAiRecommendedProduct();
  }, [userQuery]);

  // Match shoe data based on ID.
  const findShoe = () => {
    return shoeList.find((s) => aiResults.shoeId === s.id);
  };

  return (
    <div className={styles.searchResults}>
      <div className={styles.searchResultsContent}>
        {aiResults.response ? (
          <>
            <h3>Our recommendation</h3>
            <p>{aiResults.response}</p>
            {aiResults.shoeId && (
              <ul className={styles.productList}>
                <ProductCard product={findShoe()} />
              </ul>
            )}
          </>
        ) : (
          <p>Loading search results...</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
