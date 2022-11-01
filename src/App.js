import * as React from 'react';
import { TextField, Button, Box, Grid, Container } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import "./App.css"

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: ''
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <Container component="main" maxWidth="xs">
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <Controller
              name="firstName"
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
              <Button variant='contained' color='primary' type="submit">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
};

export default App;