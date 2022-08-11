import React, {useState, useEffect, useContext} from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useParams} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, EffectCards} from 'swiper';
import axios from 'axios';
import {toast} from 'react-toastify'
import userContext from '../contexts/userContext';

const ProductDetailsPage = () =>
{
    const urlParameters = useParams();
    const productURL = `https://fakse-store-api.herokuapp.com/api/v1/products`;
    const productID = urlParameters.productID;
    
    const[productDetails, setProductDetails] = useState({});
    const[productImages, setProductImages] = useState([]);

    const {userData, cartQuantity, setCartQuantity} = useContext(userContext);
    
    const[quantity, setQuantity] = useState(0);
    const[cartData, setCart] = useState(JSON.parse(localStorage.getItem("userCart")));
      
    useEffect(()=>{
        axios.get(`${productURL}/${productID}`)
        .then(res => {
            setProductDetails(res.data);
            setProductImages([res.data.category.image, ...res.data.images])
        })
        .catch(err => console.log(err.message))
    },[productURL, productID]);

    const addToCart = () =>
    {
        !userData.id
        ?
        toast.error(`You must be Login`, {position: toast.POSITION.BOTTOM_RIGHT})
        : 
        quantity <= 0 
        ? 
        toast.error(`Item Quantity must be 1 or more`, {position: toast.POSITION.BOTTOM_RIGHT})
        :
        cartData.filter(e => e.productID == productID).reduce((a,b)=>  b.productID, 0) === productID
        ?
        updateCartProductQuantity()
        :
        addProductsToCart()
    }
    
    const updateCartProductQuantity = () =>
    {
        console.log(cartData.length, "Same Product");
        toast.success(`${quantity} more ${productDetails.title} added into the cart`, {position: toast.POSITION.BOTTOM_RIGHT});
        let itemIndex = cartData.findIndex(e => e.productID === productID);
        cartData[itemIndex].productQuantity += quantity;
        setCart([...cartData]);
        setCartQuantity(cartQuantity + quantity);
    }

    const addProductsToCart = () =>
    {
        toast.success(`${quantity} ${productDetails.title} added into the cart`, {position: toast.POSITION.BOTTOM_RIGHT});
        setCart([...cartData, {productID: productID, productName: productDetails.title, productPrice: productDetails.price, productQuantity: quantity}]);
        setCartQuantity(cartQuantity + quantity);
    }

    useEffect(()=>{
        localStorage.setItem('userCart', JSON.stringify(cartData))
        localStorage.setItem('cartQuantity', `${cartQuantity}`)
    }, [cartData, cartQuantity])

    return(
        <>
            <Grid container columnSpacing={2} sx={{padding: '4rem 2rem'}}>
                <Grid item xs={12} lg={6} sx={{mb: {xs: 4, lg: 0}}}>
                    <Swiper
                        modules={[Pagination, Navigation, EffectCards]}
                        loop={true}
                        navigation={true}
                        effect={"cards"}
                        grabCursor={true}
                        style = {{width: '500px', height: '320px', "--swiper-navigation-color": "#004c59"}}
                    >
                        {
                            productImages.map(element => 
                                <SwiperSlide >
                                    <img src={element} alt={``} />
                                </SwiperSlide>
                            )
                        }    
                    </Swiper>
                </Grid>

                <Grid item lg={6} sx={{px: 3, textAlign: {xs: 'center', lg: 'start'}}}>

                    <Typography variant='h3' sx={{color: '#004c59'}}>
                        {productDetails.title}
                    </Typography>

                    <Typography variant='body1' sx={{margin: '2rem  0', fontSize: '1.25rem', textAlign: {lg: 'justify'}}}>
                        {productDetails.description}
                    </Typography>

                    <Typography variant='h4' >Rs.{productDetails.price}</Typography>

                    <Box sx={{display: 'flex', justifyContent: 'space-around', margin: '1rem 0 0 0'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <ButtonGroup variant='contained'  >
                                <Button 
                                    sx={{backgroundColor: '#004c59', px: 3, fontSize: '1.25rem'}}
                                    onClick = {()=>setQuantity(quantity-1)}
                                    disabled = {quantity<=0 ? true : false}
                                >-</Button>
                                
                                <Typography 
                                    variant='h6'
                                    sx={{px: 3, fontSize: '1.25rem'}}
                                    alignSelf='center'
                                >{quantity}</Typography>
                                
                                <Button 
                                    sx={{backgroundColor: '#004c59', px: 3, fontSize: '1.25rem'}}
                                    onClick = {()=>setQuantity(quantity+1)}
                                    disabled = {quantity>=10 ? true : false}
                                >+</Button>
                            </ButtonGroup>
                        </Box>

                            
                        <Button variant='contained' sx={{px: 5, py: 2, backgroundColor: '#004c59'}} onClick={addToCart}>
                            <ShoppingCartIcon sx={{mr: 1}} /> 
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ProductDetailsPage;