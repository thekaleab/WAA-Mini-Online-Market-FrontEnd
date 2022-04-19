import moment from "moment";
import React from "react";
import CurrencyFormat from "react-currency-format";
import * as AppConst from "../../services/constants";

function Order({ order }) {

  return (
    <div className="mb-5 border p-4">
      <div className="d-flex justify-content-between mb-3">
        <h5>
          <strong>Order-id:</strong>
          <small> {order.id}</small>
        </h5>
        <CurrencyFormat
          renderText={(value) => <h5>Order Total: {value}</h5>}
          decimalScale={2}
          value={order.amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
      <p>{moment.unix(order.orderTime).format("MMMM Do YYYY, h:mma")}</p>

      {order.orderItems?.map((item) => (
        <div className="row mb-3 p-3 d-flex align-items-center order-item">
          <img
            className="col-2"
            src={`${AppConst.api.imageAsset}/${item?.product.imgUrl}`}
            alt=""
            width="100px"
            height="100px"
          />
          <div className="col-9">
            <p>{item?.product.name}</p>
            <p>
              <small>$</small>
              <strong>{item?.product.price}</strong>
            </p>
            <div>
              {Array(item?.product.rating)
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
