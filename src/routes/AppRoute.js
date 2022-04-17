import { Route,  Routes } from 'react-router-dom';

import Home from '../components/layout/Home';
import About from '../components/layout/About';
import Product from '../components/product/Product';
import Products from '../components/product/Products';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import Orders from '../components/order/Orders';
import Order from '../components/order/Order';

const AppRoutes = 
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Order />} />
    </Routes>


export default AppRoutes;