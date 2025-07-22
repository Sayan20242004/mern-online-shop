import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from './header.js';

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/product1/all`);
        const data = await res.json();
        if (data.success) {
          const filtered = data.products.filter((prod) => {
            const fields = [prod.brandName, prod.productName, prod.type];
            return query.split(" ").every((word) =>
              fields
                .filter(Boolean)
                .some((f) => f.toLowerCase().includes(word))
            );
          });
          setProducts(filtered);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div>
      <Header />
      <h2>Search Results for: <em>{query}</em></h2>
      {products.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((prod) => (
            <div key={prod._id} style={{ border: "1px solid #ccc", padding: "16px", margin: "10px", width: "200px" }}>
              <h3>{prod.brandName}</h3>
              <p>{prod.productName}</p>
              <p>₹{prod.rate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
