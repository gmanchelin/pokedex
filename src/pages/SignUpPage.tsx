import { TextField, Button, Alert, Snackbar, SnackbarCloseReason, Typography, Grid, Box } from '@mui/material';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const schema = object({
    username: string()
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers.")
    .required("Username is required."),
    email: string()
    .email()
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      "Invalid E-mail address.")
    .required("Email is required."),
    password: string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least one number, one uppercase, one lowercase letter, and be at least 8 characters long.")
    .required("Password is required."),
  });
  const form = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(async response => {
          if (response.ok) {
            setOpenSnackbar(true);
            setMessage('Account created successfully!');
            await new Promise(resolve => setTimeout(resolve, 1500))
            navigate('/login');
          } else {
            setOpenSnackbar(true);
            setMessage('Username or email already taken.');
          }
        })
        .catch(error => {
          console.error('Error during login : ', error);
        });
    }
  });

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{
          height: '70vh'
        }}
      >
        <Typography variant='h1' sx={{ mb: 2 }}>Register</Typography>
        <Box
          component="form"
          onSubmit={form.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          noValidate
          autoComplete="off"
        >

          <TextField id="username" label="Username" variant="outlined" value={form.values.username} onChange={form.handleChange} error={form.touched.username && Boolean(form.errors.username)} />
          <TextField id="email" label="E-mail" variant="outlined" value={form.values.email} onChange={form.handleChange} error={form.touched.email && Boolean(form.errors.email)} />
          <TextField id="password" label="Password" type="password" value={form.values.password} onChange={form.handleChange} error={form.touched.username && Boolean(form.errors.password)} />
          <Button color="primary" variant="contained" type="submit">
            Sign in
          </Button>
        </Box>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );

}

export default SignUpPage;
