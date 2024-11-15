import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../authContext";
import Navbar from "../component/Navbar";
import robot from "../assets/robot.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth({});
  const redirectPath = new URLSearchParams(location.search).get("redirect");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/auth/login`,
        { email, password }
      );
      if (data?.success) {
        setAuth({
          username: data.role ? "admin" : "user",
          user_id: data.user_id,
          token: data.token,
        });
        localStorage.setItem(
          "form-auth",
          JSON.stringify({
            username: data.role ? "admin" : "user",
            user_id: data.user_id,
            token: data.token,
          })
        );
        toast.success(data.message);
        navigate("/all-forms");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-left">
          <img src={robot} alt="Robot Logo" className="robot-logo" />
          <h1>Welcome back!</h1>
          <p>Emily, your Personal NCS Guide presents herself!</p>
          <p>
            Google forms weren’t cool enough, so we built our own! Emily is a
            conversational chatbot which makes filling forms easy & fun. Also,
            you can use the in-built form builder to create personalized forms.
          </p>
          {/* <h3>How would you like to proceed?</h3>
          <button className="info-button" onClick={() => setShowSignup(true)}>
            Registration
          </button>
          <button className="info-button-outline">What is NCS?</button> */}
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              className="login-input"
              placeholder="Enter Email"
              required
            />
            <input
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              className="login-input"
              placeholder="Enter Password"
              required
            />
            <Link to={`/signup${redirectPath ? `?redirect=${redirectPath}` : ""}`} className="toggle-link">
              Create new account
            </Link>
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
