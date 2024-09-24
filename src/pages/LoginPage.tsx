import { Typography, Box, TextField, Button, Grid, Link, Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const schema = object({
        usernameOrEmail: string().required("Username or email is required."),
        password: string().required("Password is required."),
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const form = useFormik({
        initialValues: {
            usernameOrEmail: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Wrong combination of User or E-mail and password.');
                    }
                })
                .then(data => {
                    const token = data;
                    localStorage.setItem('token', token);
                    setMessage('User logged in successfully!');
                    navigate('/');
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
                }}>
                <Typography variant='h1' sx={{ mb: 2 }}>Welcome Back!</Typography>
                <Box
                    component="form"
                    onSubmit={form.handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="username-or-email" name="usernameOrEmail" label="Username or E-Mail" variant="outlined" value={form.values.usernameOrEmail} onChange={form.handleChange} error={form.touched.usernameOrEmail && Boolean(form.errors.usernameOrEmail)} />
                    <TextField id="password" name="password" label="Password" type="password" variant="outlined" value={form.values.password} onChange={form.handleChange} error={form.touched.password && Boolean(form.errors.password)} />
                    <Button color="primary" variant="contained" type="submit">
                        Login
                    </Button>
                    <Grid item sx={{ display: "flex", direction: "row", justifyContent: "center" }}>
                        <Typography>
                            Don't have an account ? {" "}
                            <Link onClick={() => navigate("/signup")}>
                                Sign Up
                            </Link>
                        </Typography>

                    </Grid>
                </Box >
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

export default LoginPage;