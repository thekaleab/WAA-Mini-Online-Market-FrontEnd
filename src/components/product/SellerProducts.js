import React, { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';

import * as api from '../../services/api';
import ProductModal from "./ProductModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await api.getProducts()
        setProducts(await response.data);
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

  const ShowProducts = () => {
    return (
      <>
        {products.map((product) => {
          return (
            <Fragment key={product.id.toString()} >
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    height="250px"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/seller/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Details
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
        <div className="col-10">
          <h1 className="display-6 fw-bolder text-center dark-text">
             Your Products
          </h1>
        </div>
        <div className="col-2 text-end">
            <button className="btn btn-sm btn-outline btn-dark mt-4" onClick={()=>setShowModal(true)}>
              <i className="fa fa-plus me-2"></i>Add
            </button>
        </div>
        <div className="col-12 mb-5">
          <hr />
        </div>
      </div>
      <ProductModal mode="new" show={showModal} product="" onHide={() => setShowModal(false)} />
      <div className="row d-flex justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

export default Products;
