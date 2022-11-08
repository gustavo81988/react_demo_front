import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  TextField, Button, Box, Grid, Container,OutlinedInput,InputAdornment,
  InputLabel,IconButton,FormControl,FormHelperText,
  Link,FormControlLabel,Checkbox,Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import {useState,useEffect} from 'react';

const schema = yup.object({
  email: yup.string().email('Must be a valid email').required('Required field'),
  password: yup.string().required('Required field'),
}).required();


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
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

  const { control, handleSubmit,setError, formState:{ errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try{
      const response = await fetch('http://127.0.0.1:8000/api/auth/login',{
        method: 'POST',
        body:JSON.stringify({
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
        setError('password', { type: 'custom', message: 'Invalid Email/Password combination.' });
        console.log(resp);
      }
    }catch(err){
      console.log(err);
    }
    setIsLoading(false);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}