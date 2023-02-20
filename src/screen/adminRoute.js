import React from "react";
import { Navigate } from "react-router-dom";
import CommonLayout from "./CommonLayout.js";
import WithoutLayout from "./WithoutLayout.js";

const PrivateRoute = ({ component, withLayout = false }) => {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "";
  return token && role === "admin" ? (
    withLayout ? (
      <WithoutLayout Children={component} />
    ) : (
      <CommonLayout Children={component} />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
