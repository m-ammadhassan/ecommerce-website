import React, {useState, useEffect, useContext} from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import userContext from '../contexts/userContext';

const CartPage = () =>
{
    const {cartQuantity, setCartQuantity} = useContext(userContext);

    const[cartData, setCartData] = useState(JSON.parse(localStorage.getItem("userCart")));

    const removeCartItem = (id) =>
    {
        const updatedCart = cartData.filter(e => e.productID !== id);
        console.log(updatedCart)
        // setCartData(localStorage.setItem("userCart", JSON.stringify(updatedCart)))
        const updateCartQuantity = cartData.filter(e => e.productID === id)[0].productQuantity;
        setCartData(updatedCart)
        setCartQuantity(cartQuantity - updateCartQuantity)
    }

    useEffect(()=>{
        localStorage.setItem('userCart', JSON.stringify(cartData));
        localStorage.setItem('cartQuantity', cartQuantity)
    }, [cartData, cartQuantity])

    return(
        <Container maxWidth='lg' sx={{py: 6}}>
            <Typography variant='h4' sx={{textAlign: 'center', mb:4, color: '#01a3a4'}}>
                Cart Page
            </Typography>

            <Grid container sx={{border: '.15rem solid #01a3a4', borderRadius: '.5rem'}} alignItems='center'>
                <Grid item xs={1} sx={{borderBottom: '.15rem solid #10ac84'}}>
                    <Typography variant='h6' textAlign='center'>Sr.No.</Typography>
                </Grid>
                <Grid item xs={5} sx={{borderBottom: '.15rem solid #10ac84'}}>
                    <Typography variant='h6' textAlign='center'>Product Name</Typography>
                </Grid>
                <Grid item xs={2} sx={{borderBottom: '.15rem solid #10ac84'}}>
                    <Typography variant='h6' textAlign='center'>Quantity</Typography>
                </Grid>
                <Grid item xs={2} sx={{borderBottom: '.15rem solid #10ac84'}}>
                    <Typography variant='h6' textAlign='center'>Price</Typography>
                </Grid>
                <Grid item xs={2} sx={{borderBottom: '.15rem solid #10ac84', borderLeft: '.15rem solid #10ac84'}}>
                    <Typography variant='h6' textAlign='center'>Actions</Typography>
                </Grid>
                {
                    cartData.map((element, index) => 
                        <Grid item xs={12} key={element.ProductID}>
                            <Grid container>
                                <Grid item xs={1} textAlign='center' sx={{py:3}}>{index+1}</Grid>
                            <Grid item xs={5} textAlign='center' sx={{py:3}}>{element.productName}</Grid>
                            <Grid item xs={2} textAlign='center' sx={{py:3}}>{element.productQuantity}</Grid>
                            <Grid item xs={2} textAlign='center' sx={{py:3}}>Rs. {element.productPrice}</Grid>
                            <Grid item xs={2} textAlign='center' sx={{py:3, borderLeft: '.15rem solid #10ac84'}}>
                                <Button variant='contained' sx={{backgroundColor: '#01a3a4'}} onClick={()=> removeCartItem(element.productID)}>Remove</Button>
                            </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>

            <Grid container sx={{border: '.15rem solid #01a3a4', borderRadius: '.5rem', mt:4, p: 3}} alignItems='center'>
                <Grid item xs={6}>
                    <Typography variant='h5' sx={{color: '#01a3a4'}}>Total Price</Typography>
                </Grid>
                <Grid item xs={6} textAlign='end'>
                    <Typography variant='h6'>
                        Rs.
                        {
                            cartData.reduce((a,b) => a + (b.productPrice*b.productQuantity)  , 0)
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CartPage;