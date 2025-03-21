import React, { useState } from "react";
// import toast from "react-toastify";
// import dotenv from "dotenv";
// import "./Login.css"; // Remove this if you no longer need the CSS file
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Components/utils";
import { Link } from "react-router-dom";
const Login = () => {
  // const URL = process.env.REACT_APP_API_URL;
  // dotenv.config();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // Handle login logic here
  //     if (!email || !password) {
  //       return handleError("Please fill all the fields");
  //     }
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8080/auth/login",
  //         {
  //           email,
  //           password,
  //         },
  //         {
  //           headers: { "Content-Type": "application/json" }, // Ensure JSON format
  //         }
  //       );
  //       const { success, name, message, jwtToken, error } = response.data;
  //       if (success) {
  //         handleSuccess(message);
  //         localStorage.setItem("name", name);
  //         localStorage.setItem("token", jwtToken);
  //         setTimeout(() => {
  //           navigate("/home");
  //         }, 1000);
  //       } else if (error) {
  //         const details = error?.details[0].message;
  //         handleError(details);
  //       }
  //       console.log(response.data);
  //     } catch (err) {
  //       console.error(
  //         "Login error:",
  //         err.response ? err.response.data : err.message
  //       );
  //       //   handleError(
  //       //     err.response?.data?.message || "An error occurred. Please try again."
  //       //   );
  //       console.log("Email:", email);
  //       console.log("Password:", password);
  //     }
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!email || !password) {
  //       return handleError("Please fill all the fields");
  //     }

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8080/auth/login",
  //         { email, password },
  //         { headers: { "Content-Type": "application/json" } }
  //       );

  //       const { success, name, message, jwtToken, error } = response.data; // ✅ Fix
  //       console.log(response.data);
  //       if (success) {
  //         handleSuccess(message || "Login successful!");
  //         localStorage.setItem("name", name);
  //         localStorage.setItem("token", jwtToken);
  //         localStorage.setItem("loggedinUser", name);

  //         setTimeout(() => {
  //           navigate("/home");
  //         }, 1000);
  //       } else if (error) {
  //         handleError(error.details?.[0]?.message || "Login failed.");
  //       }
  //     } catch (err) {
  //       console.error(
  //         "Login error:",
  //         err.response ? err.response.data : err.message
  //       );
  //       handleError(
  //         err.response?.data?.message || "An error occurred. Please try again."
  //       );
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleError("Please fill all the fields");
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Full API Response:", response.data);

      const { success, token, result, message, error } = response.data;
      console.log(result);
      const { name } = result || {};

      if (success) {
        handleSuccess(message || "Login successful!");

        if (name) {
          //   localStorage.setItem("name", name);
          localStorage.setItem("name", name);
          localStorage.setItem("token", token);
          //   console.log(
          //     "Stored in localStorage:",
          //     localStorage.getItem("loggedinUser")
          //   );
          navigate("/home");
        } else {
          console.warn("Warning: `name` is missing in API response");
        }
      } else if (error) {
        handleError(error.details?.[0]?.message || "Login failed.");
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      handleError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-black">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Login
          </button>
          <span className="block text-center text-gray-700 dark:text-gray-300 mt-4">
            New here?
            <Link to="/signup">Register </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Login;
