import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Both email and password are required.");
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, _id, name } = result;

      if (success) {
        handleSuccess(message);
        // Store in localStorage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("userId", _id);
        localStorage.setItem("userName", name);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        handleError(result.message || "Login failed.");
      }
    } catch (err) {
      handleError("Something went wrong while logging in.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="Log_box">
      <section className="sign_head" id="sign_head">
        <span className="write">Login</span>
      </section>
      <form onSubmit={handleLogin}>
        <div className="det_box" id="deet_box">
          <span className="write_1" id="write">Email</span>
          <input
            onChange={handleChange}
            type="email"
            className="Email"
            id="Email"
            name="email"
            placeholder="Enter your email-id"
          />
          <span className="write_1" id="write">Password</span>
          <input
            onChange={handleChange}
            type="password"
            className="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
          />
          <button type="submit" className="sub_but">
            <span className="but_wr">Login</span>
          </button>
          <div className="log">
            <span className="write_2">Don't have an account? </span>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
