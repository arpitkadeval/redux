import React, { lazy, useEffect, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "./core/components/Loader.js";
import { useDispatch, useSelector } from "react-redux";
import { tokenUserData } from "./store/auth/authAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";

const AdminRoute = lazy(() => import("./screen/adminRoute.js"));
// const UserRoute = lazy(() => import("./screen/userRoute"));
const Login = lazy(() => import("./screen/Auth/login.js"));
const Notfound = lazy(() => import("./screen/NotFound.js"));
// const UserDashboard = lazy(() => import("./screen/user/dashbord"));
const AdminDashboard = lazy(() => import("./screen/Admin/AdminDashboard.js"));
const Register = lazy(() => import("./screen/Auth/Register.js"));

const AppRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(
        tokenUserData({
          token: token,
        }),
      );
    }
  }, [token]);

  const auth = useSelector((state) => state);
  //   const theme = useMemo(() => createTheme(auth?.mode as "dark" | "light"), [auth?.mode]);
  const theme = createTheme({
    status: {
      danger: orange[500],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<Loader />}>
        <Routes>
          {/* AUTH_ROUTE */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="404" element={<Notfound />} />
          <Route path="*" element={<Navigate to={`/404`} replace />} />
          {/* ADMIN_ROUTE */}
          <Route
            path="admin/dashboard"
            element={<AdminRoute component={AdminDashboard} />}
          />
          {/* <Route
          path="user/dashboard"
          element={<UserRoute component={UserDashboard} />}
        /> */}
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default AppRoutes;
