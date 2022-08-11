import React from 'react';
import {Container} from '@mui/material';
import Collection from '../components/Collection';

const CollectionsPage = () =>
{
    return(
        <section className='collection-page'>
            <Container maxWidth='xl'>
                <Collection collectionName={`clothes`} collectionID={1} productLimit={6} offsetLimit={0} />
                <Collection collectionName={`shoes`} collectionID={4} productLimit={6} offsetLimit={0} />
                <Collection collectionName={`furniture`} collectionID={3} productLimit={6} offsetLimit={0} />
                <Collection collectionName={`electronics`} collectionID={2} productLimit={6} offsetLimit={0} />

            </Container>
        </section>
    );
}

export default CollectionsPage;