import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home.page';
import ProductDetails from './pages/ProductDetails.page';
import Navbar from './components/Navbar.component';
import SignUp from './pages/SignUp.page';
import SignIn from './pages/SignIn.page';
import Account from './pages/Account.page';
import ShoppingCart from './pages/ShoppingCart.page';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import NotFound from './pages/NotFound.page';
import ApiHandler from './services/ApiHandler.service';

export const notify = (type, text) => toast(text, { type: ["info", "success", "warning", "error"].includes(type.toLowerCase()) ? type.toLowerCase() : "default" });

export const apiHandler = new ApiHandler("http://localhost:3030/api/v1");

function App() {
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const [cartDropdownActive, setCartDropdownActive] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (userData?.accessToken && userData?.isLogged) {
      apiHandler.setAccessToken(userData.accessToken);
    } 

    setIsLogged(userData?.isLogged);
  }, [userData])
  

  return (
    <BrowserRouter>
      {/* Navbar with bulma */}
      <ToastContainer />
      <Navbar profileDropdownActive={profileDropdownActive} setProfileDropdownActive={setProfileDropdownActive} cartDropdownActive={cartDropdownActive} setCartDropdownActive={setCartDropdownActive} />
      <Routes>
        <Route path="/" element={<Home />} />
        {isLogged ?
          <Route path="/account" element={<Account />} />
          :
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn setIsLogged={setIsLogged} />} />
          </>
        }
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product">
          <Route index element={<Navigate to={"/"} replace={true} />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;