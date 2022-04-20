import React, { Fragment, useEffect, useReducer, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import * as AppConst from "../../services/constants";
import * as roleService from "../../services/roleService";
import * as api from '../../services/api';

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const userState = useSelector((userState) => userState.handleUser);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        api.getProducts().then(response => {
          setData(response.data);
          setFilter(response.data);
        })
      } catch(e) {
        toast.error('Error occured, please refresh page');
        return 
      } finally {
        setLoading(false);
      }
      
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2 selected"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2 selected"
            onClick={() => filterProduct("men's clothing")}
          >
            Mens' Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 selected"
            onClick={() => filterProduct("women's clothing")}
          >
            Womens' Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2 selected"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2 selected"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>
        {filter.map((product) => {
          return (
            <Fragment key={product.id.toString()} >
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4">
                  <img
                    src={`${AppConst.imgSrcBase}/${product.imgUrl}`}
                    alt={product.name}
                    height="250px"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.name.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                        {(roleService.publicOnly(userState) || roleService.buyerOnly(userState)) ? "Buy Now" : "Details"}
                    </NavLink>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center dark-text">
            Latest Products
          </h1>
          <hr />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

export default Products;
