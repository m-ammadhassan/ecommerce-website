import React, { useState, useEffect} from 'react';
import {Container, Grid} from '@mui/material'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductsListing from '../components/ProductsListing';

const CollectionPage = () =>
{
    const[category, setCategory] = useState({});

    const urlParameters = useParams();
    const collectionName = urlParameters.collectionName;
    const categoriesURL = `https://fakse-store-api.herokuapp.com/api/v1/categories`;


    useEffect(()=>{
        axios.get(categoriesURL)
        .then(
            res => setCategory(res.data.find(element => element.name.toLowerCase() === collectionName.toLowerCase()))
        )
    }, [categoriesURL, collectionName])

    const collectionID = category.id;
    console.log(collectionID)
    return(
        <Container maxWidth='xl'>
            <ProductsListing collectionID={collectionID} />
        </Container>
    )
}

export default CollectionPage;