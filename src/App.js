import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CollectionPage from './pages/CollectionPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import userContext from './contexts/userContext';

const App = () =>
{

  const[userData, setUserData] = useState({});
  const[cartQuantity, setCartQuantity] = useState(Number(localStorage.getItem("cartQuantity")));

  const getUserData = () =>
  {
    const accessToken = localStorage.getItem("userToken");
    const userProfile = `https://fakse-store-api.herokuapp.com/api/v1/auth/profile`;

    axios.get(userProfile, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      setUserData(res.data);
      toast.success(`Welcome Back ${res.data.name}`, {position: toast.POSITION.BOTTOM_RIGHT})
    })
    
  }
  
  
  useEffect(()=>{
    getUserData();
  }, [])

  return(
    <userContext.Provider value={{userData, setUserData, getUserData, cartQuantity, setCartQuantity}}>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/collections' element={<CollectionsPage />} />
        <Route path='/product/:productID' element={<ProductDetailsPage />} />
        <Route path='/collections/collection/:collectionName' element={<CollectionPage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/cart' element={userData.id ? <CartPage /> : <h1>Please Login to Continue</h1>} />
        <Route path='/profile' element={userData.id ? <ProfilePage /> : <h1>Please Login to Continue</h1>} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;