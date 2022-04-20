import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { navigate, useNavigate } from 'react-router-dom';

import * as api from '../../services/api';

export default function ProductModal(props) {

    const [product, setProduct] = useState(props.product);
    const imageRef = useRef();
    const navigate = useNavigate();

    const emptyProduct = {
        name: '',
        category: '',
        image: '',
        quantity: 0,
        price: 0.00,
        description: '',
    }
    useEffect(() => {
        if(props.mode === 'edit') {
            setProduct(props.product);
        } else {
            setProduct(emptyProduct);          
        }
    }, [props.product, props.mode]);
  
    const onChange = (target, value) => {
      setProduct(prev => {
        if(target.startsWith('nestedThing.')) {
            return {
              ...prev,
            }
        } else {
          return {
            ...prev, [target]: value
          }
        }
      })
    }
  
    const uploadFile = () => {
      
    }

    const uploadImage = (file) => {
          api.uploadFiles(file)
          .then(result => {
              let success = result;    
          })
          .catch(error => {
              toast.error("image can't be uploaded");
          });
      
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const imageFile = imageRef.current.files[0];
        if(props.mode == 'edit') {  
          const updatedImage = imageRef.current.files[0]?.name;      
          const productDto = {...product, imgUrl: updatedImage ? updatedImage: product.imageUrl};
          api.updateProduct(productDto)
          .then(result => {
              const productRes = result.data;
              toast.success('Product successfully updated!');
              if(updatedImage) {
                uploadImage(imageFile);
              }
              props.onSuccess();
              props.onHide();
          }).catch(error => {
              toast.error("Can't update product, please check and try again!");
          })
        } else {
          const productDto = {...product, imgUrl: imageRef.current.files[0]?.name }
          api.createProduct(productDto)
          .then(result => {
              uploadImage(imageFile);
              const productRes = result.data;
              toast.success('Product successfully created!');
              navigate(`/seller/products/${productRes.id}`);
          })
          .catch(error => {
            toast.error("Can't create product, please check and try again!");
          });
        }
        return false;
    }
  
    return (
        <Modal {...props} aria-labelledby="m_title" size="lg" centered>
          <Modal.Header closeButton className="px-4">
            <Modal.Title id="m_title" >
              Personal Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid g-0 px-4">
            <form onSubmit={onSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3 text-start">
                      <label htmlFor="firstName" className="form-label">
                         Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        required
                        value={product.name}
                        onChange={(e) => onChange('name', e.target.value)}
                      />
                      <div id="titleHelp" className="form-text">
                         {}
                      </div>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="price" className="form-label">
                         Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        aria-describedby="priceHelp"
                        required
                        step="0.01"
                        value={product.price}
                        onChange={(e) => onChange('price', e.target.value)}
                      />
                      <div id="priceHelp" className="form-text">
                          {}
                      </div>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="category" className="form-label">
                         Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        aria-describedby="categoryHelp"
                        required
                        value={product.category}
                        onChange={(e) => onChange('category', e.target.value)}
                      />
                      <div id="quantityHelp" className="form-text">
                          {}
                      </div>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="quantity" className="form-label">
                         Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        aria-describedby="quantityHelp"
                        required
                        value={product.quantity}
                        onChange={(e) => onChange('quantity', e.target.value)}
                      />
                      <div id="quantityHelp" className="form-text">
                          {}
                      </div>
                    </div>  
                  </div>
                  <div className="col-6"> 
                    <div className="mb-3 text-start">
                      <label htmlFor="photo" className="form-label">
                         Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="photo"
                        accept="image/png, image/jpeg, image/jpg"
                        aria-describedby="photoHelp"
                        ref={imageRef}
                      />
                      <div id="photoHelp" className="form-text">
                        {}
                      </div>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="description" className="form-label">
                          Description
                      </label>
                      <textarea 
                        className="form-control"
                        id="description"
                        aria-describedby="descriptionHelp"
                        required
                        rows="8"
                        value={product.description}
                        onChange={(e) => onChange('description', e.target.value)}
                      />
                      <div id="descriptionHelp" className="form-text">
                        {}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 offset-4">
                      <button type="submit" className="btn btn-dark w-100 mt-5 mb-3">
                           {props.mode == 'edit' ? 'Update':  'Add'} 
                      </button>
                  </div>
                </div>
              </div>    
            </form>
          </Modal.Body>
        </Modal>
    )
  }

