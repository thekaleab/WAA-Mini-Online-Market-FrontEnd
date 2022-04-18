import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import * as api from "../../services/api";

import { getBasketTotal } from "../../redux/reducer/handleCart";
import { toast } from "react-toastify";


function Checkout() {
  const state = useSelector((state) => state.handleCart);
  const [error, setError ] = useState(null);
  const [disabled, setDisabled ] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const totalCost = getBasketTotal(state);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await api.getStripSecrete(totalCost * 100);
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setProcessing(false);
        setSucceeded(true);
        api.createOrder({items: state}).then(res => {
          toast.success('Order successful placed');
          dispatch({
            type: "EMPTYCART",
          });
          navigate("/orders");
        }).catch(res => {
          toast.error('Something happened, please contact support');
          navigate('/products');
          setDisabled(true);
        })   
      })
      .catch((error) => {
        setProcessing(false);
        setDisabled(false);
        setSucceeded(false);
        // setError(error);
      });
  };

  const handleChange = (event) => {
    
  };

  let total = 0;
  const itemList = (item) => {
    total = total + item.price;

    return (
      <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm py-3">
        <div>
          <h6 className="my-0">{item.title} <span className="badge bg-dark-text rounded-pill">{item.qty}</span></h6>
        </div>
        <span className="text-muted">${item.price}</span>
      </li>
    );
  };

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-6 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="dark-text">Your cart</span>
              <span className="badge bg-dark-text rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}
              <li className="list-group-item d-flex justify-content-between py-3">
                <span>Total (USD)</span>
                <strong>${getBasketTotal(state)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <div className="needs-validation" noValidate="">
              <h4 className="mb-3">Payment</h4>

              {/* stripe */}
              <form onSubmit={handleSubmit}>
                <CardElement
                  onChange={handleChange}
                  className="form-control p-3 mb-5 mt-5"
                />
                <div className="payment-priceContainer">
                  <hr className="my-4" />
                  <button
                    className="w-100 btn btn-outline btn-outline-dark btn-lg p-1 d-flex align-items-center justify-content-center"
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {/* Errors */}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
