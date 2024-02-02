import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../../../redux/services/authApi";
import { LoadingButton } from "@mui/lab";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  phone_number: Yup.number().required("Required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      password2: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const { data, error } = await register(values);

        if (data) {
          enqueueSnackbar("Registration successful", {
            variant: "success",
          });
          navigate("/login/");
        }
        if (error) {
          if (Boolean(error.data.email)) {
            enqueueSnackbar(`${error.data.email}`, {
              variant: "error",
            });
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <Container
      className="comp-container"
      style={{ margin: "2% auto" }}
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {[
              "first_name",
              "last_name",
              "email",
              "phone_number",
              "password",
              "password2",
            ].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  required
                  fullWidth
                  name={field}
                  label={
                    field === "password2"
                      ? "Password confirm"
                      : field.split("_").join(" ").toUpperCase()
                  }
                  type={field.includes("password") ? "password" : "text"}
                  autoComplete="off"
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  error={formik.touched[field] && Boolean(formik.errors[field])}
                  helperText={formik.touched[field] && formik.errors[field]}
                />
              </Grid>
            ))}
          </Grid>
          <LoadingButton
            fullWidth
            sx={{
              height: "50px",
              fontSize: "18px",
              bgcolor: "#0b5dd6",
              marginBottom: 2,
              marginTop: 2,
            }}
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator="Loading…"
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
