import moment from "moment";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";

import * as api from "../../services/api";

import * as AppConst from "../../services/constants";

function Order(props) {
  const order = props.order;
  const orderStatusLUT = props.orderStatusLUT;

  return (
    <div className="mb-5 border p-4">
      <div className="row d-flex justify-content-between mb-3">
        <div className="col-3">
          <h5>
            <small>PLACED on</small>  
            <small> {moment.unix(Date.parse(order.orderTime)/1000).format("MMMM Do YYYY")}</small>
          </h5>

          <CurrencyFormat
            renderText={(value) => <h5><small>Total</small>: <small>{value}</small></h5>}
            decimalScale={2}
            value={order.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
        <div className="col-2">
            <button disabled className="btn btn-outline-dark">{order.status.name}</button>
        </div>
      
        <div className="col-2 text-end">
          <OrderStatusBtn order={order} orderStatusLUT={orderStatusLUT} onRefresh={()=>props.onRefresh()} />
        </div>
      </div>
      {order.orderItems?.map((item) => (
        <div key={item.id} className="row mb-3 mx-0 p-3 d-flex align-items-center order-item">
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
                  <p key={item.product.id + i}>⭐</p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


const orderStatusTOActionMapping = {
  RECEIVED: "Receive",
  CANCELLED: "Cancel",
  CART: "Cart",
  SHIPPED: "Ship",
  RETURNED: "Return",
  DELIVERED: "Deliver",
  FINALIZED: "Finalize",
  RECEIPT: "Download Receipt"
  
}


const getNextAllowedStatus = (current_status) => {
  switch(current_status){
   
    case "RECEIVED": //
      return ["CANCELLED", "SHIPPED", "RECEIPT"]
      break;
    case "DELIVERED":
      return ["RETURNED", "FINALIZED", "RECEIPT"]
      break;
    case "SHIPPED":
      return ["DELIVERED", "RECEIPT"]
      break;
    case "CART":
      return [];
      break;    
    case "RETURNED":
    case "CANCELLED":
    case "FINALIZED":
    default:
      return ["RECEIPT"];
      break;
  }
}

const OrderStatusBtn = (props) => {
  const currentStatus = props.order.status;
  const [nextStatus, setNextStatus] = useState(getNextAllowedStatus(currentStatus.name));
  const orderStatusLUT = props.orderStatusLUT;

  useEffect(() => {
      setNextStatus(getNextAllowedStatus(props.order.status.name));
  }, [props]);

  const onClick = (selectedAction)  => {
    if(selectedAction == "RECEIPT") {
      // download receipt api
    } else {
      updateOrderStatus(selectedAction);
    }
  }
  const updateOrderStatus = (selectedAction) => {
      const orderStatus = orderStatusLUT.find(oStatus => oStatus.name == selectedAction)
      api.updateOrderStatus(props.order.id, orderStatus)
        .then(result => {
           toast.success("status updated");
           props.onRefresh();
        })
        .catch(err => {
          toast.error("status can't be updated");
        });
  } 

  return(
    <Dropdown>
      <Dropdown.Toggle variant="success" className="btn-dark" id="dropdown-basic" disabled={nextStatus.length == 0}>
          ORDER ACTIONS
      </Dropdown.Toggle>

      <Dropdown.Menu>
          {
              nextStatus.map((nStatus) => 
                <Dropdown.Item key={nStatus} 
                               onClick={()=>onClick(nStatus)} >
                    {orderStatusTOActionMapping[nStatus]}
                </Dropdown.Item>
              )
            
          }
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default Order;
