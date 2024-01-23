import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../../redux/services/authApi";

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

export default function Register() {
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
        const res = await register(values);
        const { error, data } = res;

        if (data) {
          enqueueSnackbar("Kirish muvafaqiyatli amalga oshirildi", {
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="off"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone_number"
                label="Phone number"
                type="number"
                id="phone_number"
                autoComplete="off"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                error={
                  formik.touched.phone_number &&
                  Boolean(formik.errors.phone_number)
                }
                helperText={
                  formik.touched.phone_number && formik.errors.phone_number
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Password confirm"
                type="password"
                id="password2"
                autoComplete="off"
                value={formik.values.password2}
                onChange={formik.handleChange}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
              />
            </Grid>
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
}
