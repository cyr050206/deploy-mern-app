import React, { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem("token")) {
          setAuthenticated(true);
          if(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/") {
              navigate("/home", {replace: false});
          } 
      }
  }, [location, navigate,setAuthenticated]);
  return null;
};

export default RefreshHandler;
