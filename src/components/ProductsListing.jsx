import React, {useState, useEffect} from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Pagination, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

import axios from 'axios';

const ProductsListing = ({collectionID}) =>
{
    const[products, setProducts] = useState([]);
    const[pageNum, setPageNum] = useState(0);

    const basicURL = `https://fakse-store-api.herokuapp.com/api/v1`;

    useEffect(()=>{
        axios.get(collectionID ? `${basicURL}/categories/${collectionID}/products?limit=8&offset=${pageNum*8}` : `${basicURL}/products?limit=8&offset=${pageNum*8}`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err.message))
    }, [pageNum, basicURL, collectionID])

    return(
        <Container maxWidth='xl' sx={{py: 4}}>
            <Grid container flexWrap='wrap' justifyContent='center' spacing={2}>
                {
                    products.map(element => 
                        <Grid item xs={12} sm={4} md={3} key={element.id}>
                            <Card sx={{ position: 'relative', height:'100%'}}>
                                <Link to={`/product/${element.id}`}>
                                    <CardMedia component='img' image={element.category.image} />
                                </Link>
                                <CardContent>
                                    <Typography variant='body1' textTransform='uppercase' sx={{fontSize: '.75rem'}}>{element.category.name}</Typography>
                                    <Link to={`/product/${element.id}`}>
                                        <Typography variant='h6' fontWeight='bold' sx={{color: '#004c59'}}>{element.title}</Typography>
                                    </Link>
                                    <Typography variant='h6'>Rs.{element.price}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>

            <Grid container justifyContent='center' sx={{py: 4}}>
                <Grid item>
                    <Pagination count={10} shape='rounded' sx={{margin: 'auto'}} onChange={(e, p)=>setPageNum(p-1)}/>
                </Grid>
            </Grid>
        
        </Container>
    )
}

export default ProductsListing