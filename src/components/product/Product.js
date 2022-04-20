import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import * as AppConst from "../../services/constants";
import * as roleService from "../../services/roleService";
import * as api from '../../services/api';

import { addCart } from "../../redux/action";


function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const userState = useSelector((userState) => userState.handleUser);
  
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getProductById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (e) {
        toast.error('Error occured, please refresh page');
        return 
      }
    };
    getProduct();
  }, []);

  const followUser = () => {
    api.followUser(product.id)
      .then(result => toast.success("Following seller"))
      .catch(err => toast.error("Can't follow user now. Try again later"));
  }

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={`${AppConst.imgSrcBase}/${product.imgUrl}`}
            alt={product.name}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50"> {product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4"> ${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button disabled={!(roleService.publicOnly(userState) || roleService.buyerOnly(userState))}
            className="btn btn-outline-dark me-2 py-2 px-4"
            onClick={() => followUser(product)}
          >   
              Follow Seller
          </button > 
          <button disabled={!(roleService.publicOnly(userState) || roleService.buyerOnly(userState))}
            className="btn btn-outline-dark py-2 px-4"
            onClick={() => addProduct(product)}
          >
              Add to Cart
          </button > 
         
            { (roleService.publicOnly(userState) || roleService.buyerOnly(userState)) && 
              <NavLink to="/cart" className="btn btn-dark px-3 py-2 ms-2">
                Go to Cart
              </NavLink>
            }
            <NavLink to="/products" className="btn btn-outline-dark px-3 py-2 ms-2">
                Back
            </NavLink>
          </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5 ">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}

export default Product;
