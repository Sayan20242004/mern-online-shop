import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId"); // Make sure this is set after login

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/product1/all");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Product fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch user's cart
  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:8080/cart/${userId}`);
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cartItems);
      } else {
        console.error("Cart fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    if (!userId) {
      alert("Please log in first.");
      return;
    }

    const cartItem = {
      userId,
      productId: product._id,
      brandName: product.brandName,
      productName: product.productName,
      quantity: 1,
      rate: product.rate,
      finalPrice: product.rate * 1,
    };

    try {
      const res = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      const result = await res.json();

      if (result.success) {
        alert("Added to cart!");
        fetchCart();
      } else {
        alert("Failed to add to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
 useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage inside Home:", userId);
  }, []);


  return (
    <div>
      <h2>All Products</h2>
      <div className="product-list" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((prod) => (
          <div
            className="product-card"
            key={prod._id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              margin: "10px",
              width: "200px",
            }}
          >
            <h3>{prod.brandName}</h3>
            <p>{prod.productName}</p>
            <p>₹{prod.rate}</p>
            <button onClick={() => addToCart(prod)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>Check console for userId</div>;

      <h2>Your Cart</h2>
      <div className="cart">
        {cartItems.map((item) => (
          <div key={item._id}>
            {item.productName} - ₹{item.finalPrice} (Qty: {item.quantity})
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
