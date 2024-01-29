import { Box, Button, Checkbox, Container, FormControlLabel, Grid, InputLabel, TextField, Typography, colors } from "@mui/material";

import { CSSProperties } from "styled-components";

export default function LoginPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

   return (
    <>
    {/* <img src={logo} className="App-logo" alt="logo" style={{ alignContent: 'end' }} /> */}
    <Container style={{ backgroundColor: '#fff' }} component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom:4
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
                  label="User Name"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={{sx:{color:'#222'}}}
                  inputProps={{sx:{'& .MuiInputBase-input':{borderColor:'white'}}}}
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
              InputLabelProps={{sx:{color:'#222'}}}
            />
           
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" style={{color:'#222'}}/>}
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
              {/* <Link href="/" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  );
}