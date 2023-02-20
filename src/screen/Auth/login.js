import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout.js";
import { useSelector, useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../store/auth/authAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../core/components/Loader";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const Login = () => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter Email").required("Please enter "),
      password: Yup.string().required("Please Enter your password"),
    }),
    onSubmit: (values) => dispatch(login(values)),
  });

  const isLoggingIn = false;
  useEffect(() => {
    if (auth.token && auth.data?.type === "admin") {
      navigate("admin/dashboard");
    } else if (auth.token && auth.data?.type === "user") {
      navigate("user/dashboard");
    } else {
      navigate("/");
    }
  }, [auth]);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./img/startup.svg)",
          backgroundRepeat: "no-repeat",
          bgcolor: "background.default",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Loader isLoading={auth.loading} />
        <BoxedLayout>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            marginTop={3}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              label={"Email"}
              name="email"
              autoComplete="email"
              autoFocus
              disabled={isLoggingIn}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label={"Password"}
              type={showHidePassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              disabled={isLoggingIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => changeShowHidePassword(!showHidePassword)}
                  >
                    {showHidePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Button component={Link} to={"/forgotPassword"} color="primary">
                Forgot password?
              </Button>
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>

            <Button
              component={Link}
              to={"/register"}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign Up!
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
