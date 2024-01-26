import React from "react";
import "./send-feedback.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField, Box } from "@mui/material";
import axios from "axios";

export default function SendFeedBack() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/feedback/`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="comp-container">
        <div className="feedback">
          <div className="title">
            <h1>Send feedback</h1>
            <p>You can write down everything to develop foods</p>
          </div>
          <div className="feedback-box">
            <Box
              sx={{
                minWidth: "400px",
                width: "100%",
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="first_name"
                    label="First name"
                    required
                    fullWidth
                    id="firstName"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="lastName"
                    label="Last Name"
                    name="last_name"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ height: "80px" }}
                    required
                    fullWidth
                    name="message"
                    label="Message"
                    type="text"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>

              <LoadingButton
                type="submit"
                fullWidth
                sx={{ height: "50px", bgcolor: "#0b5dd6" }}
                variant="contained"
                loading={false}
                loadingIndicator="Loading…"
              >
                Send feedback
              </LoadingButton>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
