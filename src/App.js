import * as React from 'react';
import { 
  TextField, Button, Box, Grid, Container,OutlinedInput,InputAdornment,
  InputLabel,IconButton,FormControl
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from "react-hook-form";
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

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                    error={errors.firstName?.message}
                    helperText={errors.firstName?.message}
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
                    autoFocus
                    error={errors.lastName?.message}
                    helperText={errors.lastName?.message}
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
                    error={errors.email?.message}
                    helperText={errors.email?.message}
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
                    error={errors.age?.message}
                    helperText={errors.age?.message}
                    {...field} />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <OutlinedInput 
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                    autoFocus
                    error={errors.password?.message}
                    helperText={errors.password?.message}
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field} />}
                  />
                  </FormControl>
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
                    error={errors.confirmPassword?.message}
                    helperText={errors.confirmPassword?.message}
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