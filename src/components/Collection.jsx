import React from 'react';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom'
import ProductsSlider from '../components/ProductsSlider';

const Collection = ({collectionName, collectionID, productLimit, offsetLimit}) =>
{
    return(
        <Grid container padding={5} alignItems='center'>
            <Grid item xs={6}>
                <Typography variant='h4' textTransform='uppercase' sx={{color: '#004c59'}}>{collectionName}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Link to={`/collections/collection/${collectionName}`} style={{display: 'flex', alignItems: 'center', justifyContent: 'end', color: '#004c59'}}>
                    <Typography variant='body1'>See More</Typography>
                    <IconButton>
                        <KeyboardDoubleArrowRightIcon sx={{color: '#004c59'}} />
                    </IconButton>
                </Link>
            </Grid>
            <ProductsSlider categoryID={collectionID} productLimit={productLimit} offsetLimit={offsetLimit}/>
        </Grid>
    );
}


export default Collection;