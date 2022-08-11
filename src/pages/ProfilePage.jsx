import React, {useContext} from 'react';
import {Avatar, Container, Grid, Typography} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import userContext from '../contexts/userContext';


const ProfilePage = () =>
{
    const {userData} = useContext(userContext);

    return(
        <Container maxWidth='xl' sx={{py:4}}>
            <Grid container>
                <Grid item xs={12} sx={{mb:3}}>
                    <Avatar src={userData.avatar} sx={{margin: 'auto', width: '12rem', height: '12rem', border: '.15rem solid #01a3a4'}} />
                </Grid>

                <Grid item xs={12} textAlign='center' sx={{mb:3}}>
                    <Typography variant='h4' sx={{color: '#01a3a4'}}>
                        {userData.name}
                    </Typography>
                </Grid>

                <Grid item xs={12} textAlign='center'>
                    <EmailIcon sx={{color: '#01a3a4'}} />
                    <Typography variant='h6'>
                        {userData.email}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProfilePage;