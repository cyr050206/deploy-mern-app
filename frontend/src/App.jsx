import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./Routes";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <Router>
      <AllRoutes />
      <ToastContainer />
    </Router>
  );
};

export default App;
