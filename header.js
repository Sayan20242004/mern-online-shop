import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const [searchText, setSearchText] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Search for products"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Header;
