import React, { useEffect, useState } from "react";
import Order from "./Order";

function Orders() {
  const userState = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userState) {
      // TODO
    } else {
      setOrders([]);
    }
  }, [userState]);

  return (
    <div className="container">
      <h1 className="mb-5 mt-5 dark-text">Orders</h1>
      {orders.length > 0 ? (
        <div className="">
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      ) : (
        <div className="">You don't have any orders</div>
      )}
    </div>
  );
}

export default Orders;
