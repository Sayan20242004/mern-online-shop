import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from '../img/menu_ph.png';
import amazon from '../img/Amazon-Logo.png';
import cart from '../img/cart_1.jpg';
import profile from '../img/profile.jpg';
import Header from './header.js';

function Home() {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const Navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/product1/all`);
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      const result = await res.json();

      if (result.success) {
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Remove all stored data
    Navigate("/login");   // Redirect to login page
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("User ID from localStorage inside Home:", userId);
  }, []);

  return (
    <div className="item_cont">
      <section className="head_cont">
        <div className="tempt">
          <button className="menu">
            <img src={menu} alt="menu" title="menu" height={20} width={20} />
          </button>
          <img src={amazon} className="logo" alt="logo" title="logo" height={30} width={30} />
        </div>

        <Header />

        <div className="profile">
          <button className="cart_img" onClick={() => Navigate('/cart')}>
            <img src={cart} className="cart_image" alt="cart" title="cart" height={20} width={20} />
          </button>
          <button className="cart_img">
            <img src={profile} className="cart_image" alt="acc" title="acc" height={20} width={20} />
          </button>
          <button className="logout_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

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

      <div>Check console for userId</div>
    </div>
  );
}

export default Home;
