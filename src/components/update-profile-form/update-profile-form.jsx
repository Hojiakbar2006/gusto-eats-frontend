import React from "react";
import { useUpdateProfileMutation } from "../../redux/services/authApi";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function UpdateProfileForm({ data }) {
  const [updateDate, { isLoading: updateLoad }] = useUpdateProfileMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const res = await updateDate(data);
      const { error, data } = res;

      if (data) {
        enqueueSnackbar("Ma'lumotlar o'zgartirildi", {
          variant: "success",
        });
      }
      if (error) {
        if (Boolean(error.data.email)) {
          enqueueSnackbar("Ma'lumotlarni to'ldirishda xatolik", {
            variant: "error",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="comp-container">
      <h1>{data.first_name}</h1>
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
            Update
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
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
                  value={data.first_name}
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
                  value={data.last_name}
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
                  value={data.email}
                />
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone number"
                  type="number"
                  id="phone_number"
                  autoComplete="off"
                  value={data.phone_number}
                />
              </Grid>
            </Grid>
            <Link>Change Password</Link>
            <LoadingButton
              fullWidth
              sx={{
                height: "50px",
                fontSize: "18px",
                bgcolor: "#0b5dd6",
                marginBottom: 2,
                marginTop: 3,
              }}
              type="submit"
              variant="contained"
              loading={updateLoad}
              loadingIndicator="Loading…"
            >
              Update
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
    </div>
  );
}
