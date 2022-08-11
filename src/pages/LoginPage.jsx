import React, {useContext} from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import userContext from '../contexts/userContext';
import SideBackground from '../assets/images/side-background.webp';

const LoginPage = () =>
{
    const authURL = `https://fakse-store-api.herokuapp.com/api/v1/auth/login`;

    const {getUserData} = useContext(userContext)

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Email address is required')
            .email('Invalid email address'),
            password: Yup.string()
            .required('Password is required')
            .min(8, 'Must be 8 characters or more')
            .max(16, 'Must be 16 characters or less'),
        }),
        onSubmit: values => {
            console.log(values)
            axios.post(authURL, values)
            .then(res => {
                localStorage.setItem("userToken", res.data.access_token)
                getUserData();
                navigate('/', {replace: true})
                localStorage.setItem("userCart", "[]")
                localStorage.setItem("cartQuantity", '0')
            })
            .catch(err => console.log(err.message))
        }       
    });


    return(
        <section className='login-section'>
            <Container maxWidth='xl' sx={{px: '0'}}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={6} sx={{p: {xs:2, sm:4}}}>
                        <Typography variant='h4' sx={{textAlign: 'center', mt: {xs: 4, md: 0}, mb:4, color: '#004c59', textTransform: 'uppercase', letterSpacing: '.15rem'}}>Login</Typography>

                        <Box component="form" sx={{border: '.15rem solid #004c59', p: {xs: 2, sm: 3}, borderRadius: '.5rem', width: '100%'}} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField name="email" id="email" label="Email Address" fullWidth onChange={formik.handleChange} value={formik.values.email} />

                                    {
                                    formik.touched.email && formik.errors.email 
                                    ? 
                                    (<div style={{color: 'darkred'}}>{formik.errors.email}</div>) 
                                    : 
                                    (<div style={{visibility: 'hidden'}}>Error Message</div>)
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField type="password" name="password" id="password" label="Password" fullWidth onChange={formik.handleChange} value={formik.values.password} />

                                    {
                                    formik.touched.password && formik.errors.password 
                                    ? 
                                    (<div style={{color: 'darkred'}}>{formik.errors.password}</div>) 
                                    : 
                                    (<div style={{visibility: 'hidden'}}>Error Message</div>)
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" sx={{ mt:1, mb:2, backgroundColor: '#004c59'}} fullWidth>Login</Button>
                                </Grid>

                                <Grid item xs={12} display='flex' justifyContent='center' textAlign='center'>
                                    <Link to='/' style={{color: '#004c59'}}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <img src={SideBackground} alt={`Side Background`} width="100%" height="520px" />
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default LoginPage;