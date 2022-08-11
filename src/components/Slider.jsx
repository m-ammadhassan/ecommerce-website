import React from 'react';
import {Link} from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import SliderData from '../assets/data/SliderData';
import zIndex from '@mui/material/styles/zIndex';

const Slider = () =>
{
    return(
        <section className='slider-section'>
            <Container maxWidth='xl'>
                <Swiper 
                    modules={[Autoplay, Navigation]} 
                    navigation={true} 
                    loop={true}
                    autoplay={{ delay: 3000}}
                    style={{"--swiper-navigation-color": "#01a3a4"}}
                >
                    {
                        SliderData.map(element =>
                                
                            <SwiperSlide key={element.sliderID} style={{position: 'relative'}}>
                                <Box className='slider-content' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
                                    <Typography variant='h2' textAlign='center' sx={{display: {xs: 'none', sm: 'block'}, fontSize: {sm: '3.25rem', md: '4rem'}}}>Summer Collection'22</Typography>
                                    {
                                        element.sliderCategory === 'all'
                                        ?
                                        <Typography variant='h2' textAlign='center' sx={{display: {xs: 'block', sm: 'none'}, fontSize: {xs: '2.25rem'}, px:{xs: 4}}}>Summer Collection'22</Typography>
                                        :
                                        <Link to={`/collections/collection/${element.sliderCategory}`} style={{width: '100%'}}>
                                            <Typography variant='h4' textTransform='uppercase' fontWeight='bold' sx={{color: '#01a3a4', backgroundColor: 'rgba(0, 0, 0, 0.5)', mb:{sm:9}, py:2}}  textAlign='center'>{element.sliderCategory}</Typography>
                                        </Link>
                                    }
                                    
                                </Box>
                                <Box className='background-overlay' sx={{height: {xs: '288px', sm: '384px', md:'512px'}}}>
                                    <img src={element.sliderImage} alt={`Slider ${element.sliderID}`} width='100%' height='100%'/>
                                </Box>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </Container>
        </section>
    )
}

export default Slider;