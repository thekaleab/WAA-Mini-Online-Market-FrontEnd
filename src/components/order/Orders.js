import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Order from "./Order";
import * as api from "../../services/api";

function Orders() {
  const userState = useSelector((userState) => userState.handleUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userState) {
      api.getUserOrders(userState.id)
          .then(result => setOrders(result.data))
          .catch(error => setOrders([]));
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
            <Order key={order.key} order={order} />
          ))}
        </div>
      ) : (
        <div className="">You don't have any orders</div>
      )}
    </div>
  );
}

export default Orders;
