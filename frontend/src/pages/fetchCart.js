import React, { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id}>
              {item.productName} - ₹{item.finalPrice} (Qty: {item.quantity})
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
