import React, {useContext} from 'react';
import { Box, Button, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import userContext from '../contexts/userContext';
import SideBackground from '../assets/images/side-background.webp';

const SignupPage = () => 
{
    const userURL = `https://fakse-store-api.herokuapp.com/api/v1/users`;
    const authURL = `https://fakse-store-api.herokuapp.com/api/v1/auth/login`;

    const {getUserData} = useContext(userContext);

    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'customer',
            avatar: 'https://qph.cf2.quoracdn.net/main-qimg-50b6a729208b64872db6b9e4da6bffc3.webp',
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .required('Name is required')
            .matches(/^[A-Za-z ]+$/, 'Must contain only alphabets')
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less'),
            email: Yup.string()
            .required('Email address is required')
            .email('Invalid email address'),
            password: Yup.string()
            .required('Password is required')
            .min(8, 'Must be 8 characters or more')
            .max(16, 'Must be 16 characters or less'),
            // role: Yup.string()
            // .required('Role is required'),
        }),
        onSubmit: values => {
            axios.post(userURL, values)
            .then(res => {
                // console.log(res)
                axios.post(authURL, {email: values.email, password: values.password})
                .then(res => {
                    // console.log(res.data.access_token)
                    localStorage.setItem("userToken", res.data.access_token)
                    getUserData();
                    navigate('/', {replace: true})
                    localStorage.setItem("userCart", "[]")
                    localStorage.setItem("cartQuantity", '0')
                })
                .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message))
        }       
    });


    return(
        <section className='signup-section'>
            <Container maxWidth='xl' sx={{px: '0'}}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={6} sx={{p: {xs:2, sm:4}}}>
                        <Typography variant='h4' sx={{textAlign: 'center', mt: {xs: 4, md: 0}, mb:4, color: '#004c59', letterSpacing: '.15rem'}}>Create a new Account</Typography>

                        <Box component="form" sx={{border: '.15rem solid #004c59', p: {xs: 2, sm: 3}, borderRadius: '.5rem', width: '100%'}} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField name="name" id="name" label="Full Name" fullWidth onChange={formik.handleChange} value={formik.values.name} 
                                     />

                                    {
                                    formik.touched.name && formik.errors.name 
                                    ? 
                                    (<div style={{color: 'darkred'}}>{formik.errors.name}</div>) 
                                    : 
                                    (<div style={{visibility: 'hidden'}}>Error Message</div>)
                                    }
                                </Grid>

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
                                    <FormLabel sx={{fontSize: '1.15rem'}}>Avatar</FormLabel>
                                    <TextField type="file" name="avatar" id="avatar" fullWidth onChange={formik.handleChange} />

                                    {
                                    formik.touched.avatar && formik.errors.avatar 
                                    ? 
                                    (<div style={{color: 'darkred'}}>{formik.errors.avatar}</div>) 
                                    : 
                                    (<div style={{visibility: 'hidden'}}>Error Message</div>)
                                    }
                                </Grid>


                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" sx={{ mt:1, mb:2, backgroundColor: '#004c59'}} fullWidth>Sign Up</Button>
                                </Grid>

                                <Grid item xs={12} display='flex' justifyContent='center' textAlign='center'>
                                    <Link to='/' style={{color: '#004c59'}}>
                                        Have an account? Sign In
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <img src={SideBackground} alt={`Side Background`} width="100%" height="640px" />
                    </Grid>
                </Grid>
            </Container>
        </section>

    );
}

export default SignupPage;