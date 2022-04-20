import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Order from "./Order";
import * as api from "../../services/api";

function Orders() {
  const userState = useSelector((userState) => userState.handleUser);
  const [orders, setOrders] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [orderStatusLUT, setOrderStatusLUT] = useState([]);
  
  useEffect(() => {
    if (userState) {
      api.getUserOrders(userState.id)
          .then(result => setOrders(result.data))
          .catch(error => setOrders([]));
    } else {
      setOrders([]);
    }
  }, [userState, refreshData]);

  useEffect(() => {
    api.getOrderStatus()
      .then(result => {setOrderStatusLUT(result.data)})
      .catch(err => err);
  }, [refreshData]);

  return (
    <div className="container">
      <h1 className="mb-5 mt-5 dark-text">Orders</h1>
      {orders.length > 0 ? (
        <div className="">
          {orders?.map((order) => (
            <Order key={order.id} 
                   order={order} 
                   orderStatusLUT={orderStatusLUT} 
                   onRefresh={() => setRefreshData(!refreshData)} />
          ))}
        </div>
      ) : (
        <div className="">You don't have any orders</div>
      )}
    </div>
  );
}

export default Orders;
