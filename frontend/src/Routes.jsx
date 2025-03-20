import React from "react";
import {
  Navigate,
  Routes,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RefreshHandler from "./RefreshHandler";
const AllRoutes = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  const PrivateRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
    <RefreshHandler setAuthenticated={setAuthenticated}/>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/home" element={<PrivateRoute element={<Home />} />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
    </>
  );
};

export default AllRoutes;
