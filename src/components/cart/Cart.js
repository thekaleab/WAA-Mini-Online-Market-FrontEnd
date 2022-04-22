import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCart } from "../../redux/action";
import * as AppConst from "../../services/constants";


function Cart() {

  const state = useSelector((state) => state.handleCart);
  const [ userState, setUserState ] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeFromCart = (item) => {
    dispatch(deleteCart(item));
  };

  const proceedCheckout = () => {
    if (userState !== null) {
      navigate("/checkout");
    } else {
      toast.info("Please login first!");
    }
  };

  const cartItems = (product) => {
    return (
      <div key={product.id} className="px-4 m-5 bg-light rounded-3 ">
        <div className="container py-4">
          <button
            onClick={() => removeFromCart(product)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={`${AppConst.imgSrcBase}/${product.imgUrl}`}
                alt={product.name}
                height="200px"
                width="180px"
              />
              <span className="align-top badge mx-3 bg-dark-text rounded-pill">{product.qty}</span>
            </div>
            <div className="col-md-4">
              <h3>{product.name}</h3>
              <p className="lead fw-bold">${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const checkoutButton = () => {
    return (
      <div className="container">
        <div className="row">
          <button
            onClick={proceedCheckout}
            className="btn btn-dark mb-5 w-25 mx-auto"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      <div className="mx-5 ps-3 pe-4">
        {state.length !== 0 && state.map(cartItems)}
        {state.length !== 0 && checkoutButton()}
      </div>
    </>
  );
}

export default Cart;
