import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

import ProductModal from './ProductModal';

import * as api from '../../services/api';

function SellerProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal ] = useState(false);
  const [showDeleteModal, setShowDeleteModal ] = useState(false);

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
  }, [id]);

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
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50"> {product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4"> ${product.price}</h3>
          <p className="lead">{product.description}</p>
          
          <button
            className="btn btn-outline-dark me-2 py-2 pe-4 ps-2"
            onClick={() => setShowModal(true)}
          >
              <i className="fa fa-pencil me-2"/>
              Edit
          </button>
          <button
            className="btn btn-outline-dark  py-2 me-2 pe-4 ps-2"
            onClick={() => setShowDeleteModal(true)}
          >
              <i className="fa fa-trash me-2" />
              Delete
          </button>
          <NavLink to="/seller/products" className="btn btn-dark px-3 py-2 ms-2">
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
          <ProductModal show={showModal} onHide={() => setShowModal(false)} product={product} mode='edit' />
          <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false) } />
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}

const DeleteModal = (props)  => {

  const deleteProduct = () => {
      // api to delete product.
  }

  return(
      <Modal {...props} aria-labelledby="m_title" size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are about to delete a product</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-dark btn-sm  py-2 me-2 px-3" onClick={props.onHide}>
            Cancel
          </button>
          <button className="btn btn-outline-dark btn-sm py-2 me-2 px-3" onClick={deleteProduct}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
  )
}

export default SellerProduct;
