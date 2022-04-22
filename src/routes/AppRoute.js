import { Route,  Routes } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from '../components/layout/Home';
import About from '../components/layout/About';
import Product from '../components/product/Product';
import Products from '../components/product/Products';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import Orders from '../components/order/Orders';
import Order from '../components/order/Order';
import Login from '../components/user/Login';
import Signup from '../components/user/Signup';
import Profile from '../components/user/Profile';
import SellerProducts from '../components/product/SellerProducts';
import SellerProduct from '../components/product/SellerProduct';
import Admin from '../components/admin/Admin';
import Authorized from '../components/user/Authorized';

const promise = loadStripe(
    "pk_test_TYooMQauvdEDq54NiTphI7jx"
);

const AppRoutes = 
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={
            <div className="not-found align-middle text-center w-100">
                    <h1 style={{marginTop: 5+'em'}}>Page not found</h1>
            </div>
            } />

       
        <Route path="/" element={<Authorized />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seller/products" element={<SellerProducts /> } />
            <Route path="/seller/products/:id" element={<SellerProduct /> } />
            <Route path="/admin" element={<Admin /> } />
            <Route path="/checkout" element={
                                    <Elements stripe={promise}>
                                        <Checkout />
                                    </Elements>   
                                } />
        </Route>
    </Routes>


export default AppRoutes;