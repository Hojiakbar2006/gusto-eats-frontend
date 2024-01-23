import * as React from "react";
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
import { LoadingButton } from "@mui/lab";
import { useLoginMutation } from "../../redux/services/authApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password should be at least 6 characters"),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values);
        const { error, data } = res;
        if (data) {
          console.log(data);
          enqueueSnackbar("Kirish muvafaqiyatli amalga oshirildi", {
            variant: "success",
          });
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          navigate(-1);
        }
        if (error) {
          if (error.status === 400) {
            enqueueSnackbar("Foydalanuvchi ma'lumotlari to'liq emas", {
              variant: "error",
            });
          }
          if (error.status === 401) {
            enqueueSnackbar("Foydalanuvchi ma'lumotlari topilmadi", {
              variant: "error",
            });
          }
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <Container
      className="comp-container"
      style={{ margin: "5% auto" }}
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
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
            Login
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
