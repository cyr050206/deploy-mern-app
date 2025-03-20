import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../Components/utils";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [Loggedinuser, setLoggedinUser] = useState("");
  const [products, setProducts] = useState([]);
  // const [rotation, setRotation] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLoggedinUser(localStorage.getItem("name"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      setLoggedinUser("");
      navigate("/login");
    }, 1000);
  };

  //   const getProducts = async () => {
  //     const url = "http://localhost:8080/products";
  //     const headers = {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     };

  //     const response = await axios.get(url, headers);
  //     const result = await response.json();
  //     console.log(result);
  //   };
  //   useEffect(() => {
  //     getProducts();
  //   }, []);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.log("Incorreect Authentication....Redirecting to Login");
  //       navigate("/login");
  //       return;
  //     }
  //   };
  // }, []);
  //       useEffect(() => {
  //         const checkAuth = async () => {
  //           const token = localStorage.getItem("token");
  //           if (!token) {
  //             console.warn("No token found! Redirecting to login...");
  //             navigate("/login");
  //             return;
  //           }

  //           try {
  //       const response = await axios.get("http://localhost:8080/verify-token", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.data.success) {
  //         setLoggedinUser(localStorage.getItem("name"));
  //         getProducts(); // Fetch products only if authentication is valid
  //       } else {
  //         console.warn("Invalid token! Redirecting...");
  //         // localStorage.removeItem("token");
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.error("Token verification failed:", error.response?.data || error.message);
  //       // localStorage.removeItem("token");
  //       navigate("/login");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  const getProducts = async () => {
    try {
      const url = "http://localhost:8080/products/";
      const token = localStorage.getItem("token");
      // console.log("Token: ", token);
      if (!token) {
        console.error("No token found!");
        return;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  // if (isLoading) {
  //   return <h1>Loading...</h1>; // 🔹 Show loading while checking authentication
  // }
  return (
    // <div>
    //   <h1>Home</h1>
    //   {Loggedinuser}
    //   <h2>All products:</h2>
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.id}>
    //         <strong>{product.name}</strong> <strong>{product.price}</strong>
    //       </li>
    //     ))}
    //   </ul>
    //   <button className="p-2 border-2 text-ba" onClick={handleLogout}>
    //     Logout
    //   </button>
    // </div>
    <div className="min-h-screen bg-gray-900 p-10 flex flex-col items-center text-white">
      <h1 className="text-4xl font-semibold text-gray-100 mb-6">Home</h1>
      <p className="text-lg text-gray-300 bg-gray-800 px-6 py-3 rounded-lg shadow-md">
        Welcome, <span className="font-medium text-white">{Loggedinuser}</span>
      </p>
      <h2 className="text-2xl font-medium text-gray-200 mt-8 mb-4">
        All Products
      </h2>
      <ul className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md divide-y divide-gray-700">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between p-4 text-gray-300"
          >
            <span className="font-medium text-white">{product.name}</span>
            <span className="text-gray-400">${product.price}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-8 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
