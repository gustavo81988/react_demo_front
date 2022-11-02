import * as React from 'react';
import { TextField, Button, Box, Grid, Container } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import "./App.css"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"),null]).required(),
}).required();

const theme = createTheme();

const App = () => {
  const { control, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = data => console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
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
                  <p>{errors.firstName?.message}</p>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <TextField 
                    margin="normal"
                    fullWidth
                    label="Last Name"
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
                    label="Email Address"
                    autoFocus
                    {...field} />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => <TextField 
                    margin="normal"
                    fullWidth
                    label="Age"
                    autoFocus
                    {...field} />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField 
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                    autoFocus
                    {...field} />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <TextField 
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    autoFocus
                    {...field} />}
                  />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;