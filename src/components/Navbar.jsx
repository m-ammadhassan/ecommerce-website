import React, {useState, useContext} from 'react';
import {AppBar, Avatar, Badge, Box, Button, Container, Divider, Drawer, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from 'react-router-dom';
import userContext from '../contexts/userContext';

const Navbar = () => {
    
    const NavbarLink = styled(Link)`
        color: #c8d6e5;
        font-size: 1.25rem; 
        border: .15rem solid transparent;
        margin: 0 0 0 1.5rem; 
    `;

    const[avatarMenu, setAvatarMenu] = useState(false)

    const[responsiveMenu, setResponsiveMenu] = useState(false)

    const {userData, setUserData, cartQuantity, setCartQuantity} = useContext(userContext);

  return (
    <AppBar position="static" sx={{backgroundColor: '#004c59'}}>
      <Container maxWidth="xl">
        <Toolbar sx={{alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', py: 2}}>
        
            <Typography variant="h4" component="a" href="/"
                sx={{ color: '#c8d6e5', textDecoration: 'none',}}
            >
                Sneak Peak
            </Typography>

            {
                userData.id
                ?
                <Box sx={{ display: 'flex'}} alignItems = 'center'>
                    <NavbarLink to="/cart" sx={{margin: '0 1.5rem 0 0'}}>
                        <Badge badgeContent={cartQuantity} color='success'>
                            <ShoppingCartIcon  />
                        </Badge>
                    </NavbarLink>

                    <IconButton onClick={() => setAvatarMenu(prevState => !prevState)}>
                        <Avatar src={userData.avatar}></Avatar>
                    </IconButton>

                    <Drawer
                        anchor = 'right'
                        open = {avatarMenu}
                        onClose = {() => setAvatarMenu(prevState => !prevState)}
                    >
                        <Box
                            sx = {{width: 250, backgroundColor: '#004c59', height: '100%'}}
                            onClick = {() => setAvatarMenu(prevState => !prevState)}
                            textAlign = 'center'
                        >
                            <Avatar src={userData.avatar} sx={{margin: 'auto', width: '5rem', height: '5rem', mt: 4}} />
                            <Link to='/profile'>
                                <Typography variant='h6' sx={{color: '#c8d6e5', my:2}}>
                                    {userData.name}
                                </Typography>
                            </Link>
                            <Divider sx={{backgroundColor: '#c8d6e5'}} />
                            <Box
                                sx={{mt: 4}}
                                textAlign = 'center' 
                            >
                                <NavbarLink to="/" sx={{margin: '1.5rem 0', display: 'block'}}>Home</NavbarLink>
                                <NavbarLink to="/collections" sx={{margin: '1.5rem 0', display: 'block'}}>Collections</NavbarLink>
                                <NavbarLink to="/profile" sx={{margin: '1.5rem 0', display: 'block'}}>Profile</NavbarLink>
                                <Button 
                                    variant='outlined' 
                                    sx={{ color: '#c8d6e5', margin: '1.5rem auto', border: '.15rem solid #c8d6e5', display: 'block'}} 
                                    onClick={() => { localStorage.clear(); setUserData({}); setCartQuantity(0) } }
                                >
                                Sign Out
                                </Button>
                            </Box>
                        </Box>
                    </Drawer>
                </Box>

                :

                <Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <NavbarLink to="/">Home</NavbarLink>
                        <NavbarLink to="/collections">Collections</NavbarLink>
                        <NavbarLink to="/login">Login</NavbarLink>
                        <NavbarLink to="/signup">Sign Up</NavbarLink>
                    </Box>

                    <Box sx={{display: { xs: 'flex', md: 'none' } }}>
                        <IconButton 
                            onClick={() => setResponsiveMenu(prevState => !prevState)}
                            sx={{color: '#c8d6e5'}}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            anchor='right'
                            open = {responsiveMenu}
                            onClose = {() => setResponsiveMenu(prevState => !prevState)}
                        >
                            <Box
                                sx = {{width: {xs: '80vw', sm: 250}, backgroundColor: '#004c59', height: '100%', display: 'flex', flexDirection: 'column'}}
                                onClick = {() => setResponsiveMenu(prevState => !prevState)}
                                alignItems = 'center'
                                justifyContent= 'center'
                            >
                                <NavbarLink to="/" sx={{margin: '1.5rem 0', display: 'block'}}>Home</NavbarLink>
                                <NavbarLink to="/collections" sx={{margin: '1.5rem 0', display: 'block'}}>Collections</NavbarLink>
                                <NavbarLink to="/login" sx={{margin: '1.5rem 0', display: 'block'}}>Login</NavbarLink>
                                <NavbarLink to="/signup" sx={{margin: '1.5rem 0', display: 'block'}}>Sign Up</NavbarLink>
                            </Box>
                        </Drawer>
                    </Box>
                </Box>

            }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
