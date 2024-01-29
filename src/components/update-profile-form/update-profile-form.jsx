import React, { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/services/authApi";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function UpdateProfileForm() {
  const [updateDate, { isLoading: updateLoad }] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFields = {};

      if (data.first_name !== value.first_name) {
        updatedFields.first_name = value.first_name;
      }
      if (data.last_name !== value.last_name) {
        updatedFields.last_name = value.last_name;
      }
      if (data.email !== value.email) {
        updatedFields.email = value.email;
      }
      if (data.phone_number !== value.phone_number) {
        updatedFields.phone_number = value.phone_number;
      }

      if (Object.keys(updatedFields).length > 0) {
        const res = await updateDate(updatedFields);
        const { error, data } = res;
        if (data) {
          enqueueSnackbar("Ma'lumotlar o'zgartirildi", {
            variant: "success",
          });
        }
        if (error) {
          enqueueSnackbar("Ma'lumotlarni o'zgartirishda xatolik", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("O'zgartirilgan ma'lumotlar topilmadi", {
          variant: "info",
        });
      }
    } catch (error) {
      console.error("Xatolik:", error);
      enqueueSnackbar("Amaliyotni bajarishda xatolik", {
        variant: "error",
      });
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
                  onChange={(e) =>
                    setValue({ ...value, first_name: e.target.value })
                  }
                  value={value.first_name}
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
                  onChange={(e) =>
                    setValue({ ...value, last_name: e.target.value })
                  }
                  value={value.last_name}
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
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  value={value.email}
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
                  onChange={(e) =>
                    setValue({ ...value, phone_number: e.target.value })
                  }
                  value={value.phone_number}
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
