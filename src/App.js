import * as React from 'react';
import { TextField, Button, Box, Grid, Container } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import "./App.css"
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: ''
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <TextField 
                margin="normal"
                fullWidth
                label="First Name"
                name="las_name"
                autoFocus
                {...field} />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <TextField 
                margin="normal"
                fullWidth
                label="Last Name"
                name="las_name"
                autoFocus
                {...field} />}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField 
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                {...field} />}
              />
            </Grid>
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Grid>
        </Box>
      </Container>
  );
};

export default App;