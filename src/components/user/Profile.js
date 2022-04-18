import { Tab, Row, Col, Nav, Modal, Container } from 'react-bootstrap';
import { useState } from 'react';

import "./profile.css";

function Profile(){
    return(
        <div className="container py-4 my-4">
          <div className="row justify-content-center align-content-center">
            
              <Tab.Container id="left-tabs-example" defaultActiveKey="first" transition={false}> 
                <Row>
                  <Col sm={3}>
                    <Nav className="flex-column dark-text">
                      <Nav.Item className="mb-2">
                        <Nav.Link className="dark-text" eventKey="personal_info">Personal Information</Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="my-2">
                        <Nav.Link className="dark-text"  eventKey="payment">Payment Information</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="personal_info">
                          <PersonalInfo />
                      </Tab.Pane>
                      <Tab.Pane eventKey="address">
                          <Address />
                      </Tab.Pane>
                      <Tab.Pane eventKey="payment">
                          <Payment />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
          </div>
        </div>
    )
}


const PersonalInfo = () => {
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  return(
    <div className="container">
      <div className="row g-0">
        <div className="modals">
            <PersonalInfoModal show={showPersonalInfoModal} onHide={()=>setShowPersonalInfoModal(false)} />
        </div>
        <div className="card col-md-8">
            <div className="card-header row g-0 py-2">
              <div className="col-8"> 
                  <h4>Personal Details </h4>
              </div>
              <div className="col-4 text-end">
                <button onClick={() => setShowPersonalInfoModal(true)} 
                        className="btn btn-sm btn-outline-dark ms-2">
                    <i className="fa fa-pencil me-1 "></i>
                </button>
              </div>
            </div>
            <div className="card-body py-2">
              <div className="row my-2 py-2 ">
                  <div className="col-4 fw-bold text-start">First Name</div>
                  <div className="col-8">{'Abenezer'}</div>
              </div>
              <div className="row my-2 py-2 ">
                  <div className="col-4 fw-bold text-start">Last Name</div>
                  <div className="col-8">{'Mamuyea'}</div>
              </div>
              <div className="row my-2 py-2 ">
                  <div className="col-4 fw-bold text-start">Email</div>
                  <div className="col-8">{'test@test.com'}</div>
              </div>
              <div className="row my-2 py-2 ">
                  <div className="col-4 fw-bold text-start">Role</div>
                  <div className="col-8">{'BUYER'}</div>
              </div>
              <div className="row my-2 py-2 ">
                  <div className="col-4 fw-bold text-start">Address</div>
                  <div className="col-8">
                        1000 North 4th Street
                        <br/>
                        Fairfield, IA
                        <br/>
                        52557
                        <br/>
                        USA
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    
  )
}


const Address = () => {
  return(
    <div>
      <h5>Address</h5>
    </div>
  )
}

const Payment = () => {
  return(
    <div className="container">
      <div className="row g-0">
        <div className="modals">
            {/* <PersonalInfoModal show={showPersonalInfoModal} onHide={()=>setShowPersonalInfoModal(false)} /> */}
        </div>
        <div className="card col-md-8">
            <div className="card-header row g-0 py-2">
              <div className="col-8"> 
                  <h4>Payment method </h4>
              </div>
              <div className="col-4 text-end">
                {/* <button onClick={() => setShowPersonalInfoModal(true)} 
                        className="btn btn-sm btn-outline-dark ms-2">
                    <i className="fa fa-pencil me-1 "></i>
                </button> */}
              </div>
            </div>
            <div className="card-body py-2">
              <div className="row m-3 p-2 py-2 payment-card">
                <div className="col-12 align-middle pt-3">
                    <h6>Card ending in {'8888'}</h6>
                </div>
                <div className="col-9 align-middle">
                    {'Abenezer Mamuyea'}
                </div>
                <div className="col-3 align-middle">
                    {'02/12'}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}


const PersonalInfoModal = (props) => {
  let modal = props.modal;

  const hideModal = () => {
    props.onHide();
  }
  const emptyUser = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    address: {
      zip: '',
      street: '',
      city: '',
      state: '',
      country: ''
    }
  };

  const [user, setUser] = useState(emptyUser);

  const onChange = (target, value) => {
    setUser(prev => {
      if(target.startsWith('address.')) {
          return {
            ...prev,
            address: {
              ...prev.address,
              [target.split('address.')[1]]: value
            }
          }
      } else {
        return {
          ...prev, [target]: value
        }
      }
    })
  }

  const update = (e) => {
      e.preventDefault();
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
          <form onSubmit={update}>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="mb-3 text-start">
                    <label htmlFor="firstName" className="form-label">
                       First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      aria-describedby="firstNameHelp"
                      required
                      value={user.firstName}
                      onChange={(e) => onChange('firstName', e.target.value)}
                    />
                    <div id="firstName" className="form-text">
                       {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="lastName" className="form-label">
                       Last Name
                    </label>
                    <input
                      type="lastName"
                      className="form-control"
                      id="lastName"
                      aria-describedby="lastNameHelp"
                      required
                      value={user.lastName}
                      onChange={(e) => onChange('lastName', e.target.value)}
                    />
                    <div id="lastNameHelp" className="form-text">
                        {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="email" className="form-label">
                       Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      required
                      value={user.email}
                      onChange={(e) => onChange('email', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                      {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="address_street" className="form-label">
                       Street Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address_street"
                      aria-describedby="streetHelp"
                      required
                      value={user.address.street}
                      onChange={(e) => onChange('address.street', e.target.value)}
                    />
                    <div id="streetHelp" className="form-text">
                       {}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  
                  <div className="mb-3 text-start">
                    <label htmlFor="address_city" className="form-label">
                       City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address_city"
                      aria-describedby="cityHelp"
                      required
                      value={user.address.city}
                      onChange={(e) => onChange('address.city', e.target.value)}
                    />
                    <div id="cityHelp" className="form-text">
                        {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="addresss_state" className="form-label">
                       State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addresss_state"
                      aria-describedby="stateHelp"
                      required
                      value={user.address.state}
                      onChange={(e) => onChange('address.state', e.target.value)}
                    />
                    <div id="stateHelp" className="form-text">
                      {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="address_zip" className="form-label">
                       ZIP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address_zip"
                      aria-describedby="zipHelp"
                      required
                      value={user.address.zip}
                      onChange={(e) => onChange('address.zip', e.target.value)}
                    />
                    <div id="zipHelp" className="form-text">
                      {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="streetCountry" className="form-label">
                       Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="streetCountry"
                      aria-describedby="countryHelp"
                      required
                      value={user.address.country}
                      onChange={(e) => onChange('address.country', e.target.value)}
                    />
                    <div id="countryHelp" className="form-text">
                      {}
                    </div>
                  </div>
                </div>
                <div className="col-4 offset-4">
                    <button  onClick={update} className="btn btn-dark w-100 mt-5 mb-3">
                         Update
                    </button>
                </div>
              </div>
            </div>    
          </form>
        </Modal.Body>
      </Modal>
  )
}

const AddressModal = () => {

}

const PaymentModal = () => {

}

export default Profile;