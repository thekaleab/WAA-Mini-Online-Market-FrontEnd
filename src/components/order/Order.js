import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";

import * as api from "../../services/api";

import * as AppConst from "../../services/constants";

function Order(props) {
  const order = props.order;
  const orderStatusLUT = props.orderStatusLUT;
  const userState = useSelector((userState) => userState.handleUser);
  
  return (
    <div className="mb-5 border p-4">
      <div className="row d-flex justify-content-between mb-3">
        <div className="col-9">
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
        {/* <div className="col-2">
            <button disabled className="btn btn-outline-dark">{order.status.name}</button>
        </div> */}
      
        <div className="col-3 pt-3 pe-3 text-end">
          <a type="button" className="btn btn-outline-dark" 
            href={`${AppConst.invoiceBase}/${order.id}`} download target="_blank">
              RECEIPT
          </a>
        </div>
      </div>
      {order.orderItems?.map((item) => (
        <div key={item.id} className="row mb-3 mx-0 p-3 d-flex align-items-center order-item">
          <div className="col-2">
              <img
                className="col-2"
                src={`${AppConst.imgSrcBase}/${item?.product.imgUrl}`}
                alt=""
                style={{width: 150 +"px", height: 150 + "px"}}
              />
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-8">
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
              
              <div className="col-2">
                  <button disabled className="btn btn-outline-dark">{item.status.name}</button>
              </div>
      
              <div className="col-2 text-end">
                <OrderStatusBtn orderItem={item} order={order} orderStatusLUT={orderStatusLUT} onRefresh={()=>props.onRefresh()} />
              </div>    
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


const getNextAllowedStatus = (current_status, mode="BUYER") => {
  if(mode=="ADMIN") {
    return [];
  }
  if(mode == "SELLER") {
    switch(current_status){
      case "RECEIVED": //
        return ["CANCELLED", "SHIPPED"]
        break;
      case "DELIVERED":
        return ["FINALIZED"]
        break;
      case "SHIPPED":
        return ["DELIVERED"]
        break;
      case "CART":
        return [];
        break;    
      case "RETURNED":
      case "CANCELLED":
      case "FINALIZED":
      default:
        return [];
        break;
    }
  } else {
    switch(current_status){
      case "RECEIVED": //
        return ["CANCELLED"]
        break;
      case "DELIVERED":
        return ["RETURNED"]
        break;
      case "SHIPPED":
        return []
        break;
      case "CART":
        return [];
        break;    
      case "RETURNED":
      case "CANCELLED":
      case "FINALIZED":
      default:
        return [];
        break;
    }
  }
}

const OrderStatusBtn = (props) => {
  const currentStatus = props.orderItem.status;
  const userState = useSelector((userState) => userState.handleUser);
  const [nextStatus, setNextStatus] = useState(getNextAllowedStatus(currentStatus.name, userState.role.name));
  const orderStatusLUT = props.orderStatusLUT;

  useEffect(() => {
      setNextStatus(getNextAllowedStatus(props.orderItem.status.name, userState.role.name));
  }, [props]);

  const updateOrderStatus = (selectedAction) => {
      const orderStatus = orderStatusLUT.find(oStatus => oStatus.name == selectedAction)
      api.updateOrderItemStatus(props.orderItem.id, {orderId: props.order.id, statusId: orderStatus.id})
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
                               onClick={()=>updateOrderStatus(nStatus)} >
                    {orderStatusTOActionMapping[nStatus]}
                </Dropdown.Item>
              )
            
          }
      </Dropdown.Menu>
    </Dropdown>
  )

}

export default Order;
