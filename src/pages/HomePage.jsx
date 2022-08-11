import React from 'react'
import ProductsListing from '../components/ProductsListing';
import Slider from '../components/Slider';

const HomePage = () => 
{
    return(
        <>
            <Slider />
            <ProductsListing />
        </>
    )
}

export default HomePage;