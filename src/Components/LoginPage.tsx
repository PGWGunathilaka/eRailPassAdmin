import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (true || (email === "prasadini.gunathilaka@yahoo.com" && password === "password")) {
      window.location.href = "/profile";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Container style={{ backgroundColor: '#fff' }} component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4
          }}
        >
          <Typography component="h1" variant="h5" color='#222'>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ sx: { color: '#222' } }}
              inputProps={{ sx: { '& .MuiInputBase-input': { borderColor: 'white' } } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ sx: { color: '#222' } }}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" style={{ color: '#222' }} />}
              label={<Typography style={{ color: '#222' }}>Remember me</Typography>}

            />
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}