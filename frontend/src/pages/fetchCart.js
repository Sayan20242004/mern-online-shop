import React, { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/${userId}`);
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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <p>{item.productName}</p>
              <p>₹{item.finalPrice} (Qty: {item.quantity})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
