import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout.js";

const genders = [
  { label: "M", value: "Male" },
  { label: "F", value: "Female" },
  { label: "NC", value: "Other" },
];

const Register = () => {
  const isRegistering = false;

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      gender: "F",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("common.validations.required"),
      firstName: Yup.string()
        .max(20, "common.validations.max")
        .required("common.validations.required"),
      lastName: Yup.string()
        .max(30, "common.validations.max")
        .required("common.validations.required"),
    }),
    onSubmit: (values) => handleRegister(),
  });

  const handleRegister = async () => {
    alert("Values");
  };

  return (
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
        margin: "auto",
      }}
    >
      <BoxedLayout>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          marginTop={3}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={"Last Name"}
            name="lastName"
            autoComplete="family-name"
            autoFocus
            disabled={isRegistering}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={"First Name"}
            name="firstName"
            autoComplete="given-name"
            disabled={isRegistering}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gneder</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  control={<Radio />}
                  key={gender.value}
                  disabled={isRegistering}
                  label={gender.label}
                  value={gender.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={"E-mail Address"}
            name="email"
            autoComplete="email"
            disabled={isRegistering}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isRegistering}
            // loading={isRegistering}
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Button
            component={Link}
            to={"/"}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Back to Login
          </Button>
        </Box>
      </BoxedLayout>
    </Grid>
  );
};

export default Register;
