import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Pagination } from "swiper";

const ProductsSlider = ({categoryID, productLimit, offsetLimit}) =>
{
    const[products, setProducts] = useState([]);

    const basicURL = `https://fakse-store-api.herokuapp.com/api/v1`;

    useEffect(()=>{
        axios.get(`${basicURL}/categories/${categoryID}/products?limit=${productLimit}&offset=${offsetLimit}`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err.message))
    }, [basicURL, categoryID, productLimit, offsetLimit])

    return(
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ dynamicBullets: true}} 
            loop={true}
            breakpoints = {{ 768: {slidesPerView: 2}, 992: {slidesPerView: 4} }}
            style={{margin: '1.25rem 0 0 0'}}
        >
            {
                products.map(element => 
                    <SwiperSlide>
                        <Card sx={{border: '.1rem solid #004c59', minHeight: '400px'}}>
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
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}

export default ProductsSlider;