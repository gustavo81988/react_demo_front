import * as React from 'react';
import {useState} from 'react';
import { 
  TextField, Button, Box, Grid, Container,OutlinedInput,InputAdornment,
  InputLabel,IconButton,FormControl,FormHelperText,LinearProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required('Required field'),
  lastName: yup.string().required('Required field'),
  email: yup.string().email('Must be a valid email').required('Required field'),
  password: yup.string().min(4,'Must be at least 4 characters').max(15,'Must be at most 15 characters').required(),
  confirmPassword: yup.string()
    .oneOf( [yup.ref("password"),''],'Password does not match').required('Required field'),
}).required();

const theme = createTheme();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState:{ errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try{
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup',{
        method: 'POST',
        body:JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      const resp = await response.json();
      
      if (response.ok) {
        console.log(resp);
      }else{
        console.log('errors!',resp);
      }
    }catch(err){
      console.log('Something went wrong.');
    }
    setIsLoading(false);
  };

  const [values, setValues] = React.useState({
    password: '',
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
      {isLoading && <LinearProgress />}
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Sign up
          </Typography>

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
                    error={errors.firstName?.message ? true : false}
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
                    error={errors.lastName?.message ? true : false}
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
                    error={errors.email?.message ? true : false}
                    helperText={errors.email?.message}
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
                      fullWidth
                      type="password"
                      label="Password"
                      error={errors.password?.message ? true : false}
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
                    <FormHelperText error >{errors.password?.message}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel>Confirm Password</InputLabel>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => <OutlinedInput 
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      error={errors.confirmPassword?.message ? true : false}
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
                    <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
                  </FormControl>
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