import React, { useEffect, useState } from "react";


function Checkout() {
  const [state, setState] = useState([]);
  const { error, setError } = useState(null);
  const { disabled, setDisabled } = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO checkout
  };


  const getBasketTotal = () => {
    return 0.0; 
  }

  let total = 0;
  const itemList = (item) => {
    total = total + item.price;

    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">{item.title}</h6>
        </div>
        <span className="text-muted">${item.price}</span>
      </li>
    );
  };

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${getBasketTotal}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="needs-validation" noValidate="">
              <h4 className="mb-3">Payment</h4>

              {/* stripe */}
              <form onSubmit={handleSubmit}>
                <div className="payment-priceContainer">
                  <hr className="my-4" />
                  <button
                    className="w-100 btn btn-primary btn-lg p-1 d-flex align-items-center justify-content-center"
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
