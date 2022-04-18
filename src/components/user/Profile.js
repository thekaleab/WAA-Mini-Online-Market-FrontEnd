import { Tab, Row, Col, Nav, Modal, Container } from 'react-bootstrap';
import { useState } from 'react';

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
    <div>
      <h5>Payment</h5>
    </div>
  )
}


const PersonalInfoModal = (props) => {
  let modal = props.modal;
  const hideModal = () => {
    props.onHide();
  }
  const emptyUser = {
    username: '',
    password: '',
    role_id: '',
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
      return {
        ...prev, [target]: value
      }
    })
  }

  const update = () => {

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
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       First Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.firstName}
                      onChange={(e) => onChange('firstName', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                       {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       Last Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.lastName}
                      onChange={(e) => onChange('lastName', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       Street Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.address}
                      onChange={(e) => onChange('address', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                       {}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       City
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.address}
                      onChange={(e) => onChange('city', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                        {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       State
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.address}
                      onChange={(e) => onChange('state', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                      {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       ZIP
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.address}
                      onChange={(e) => onChange('zip', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                      {}
                    </div>
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       Country
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={user.address}
                      onChange={(e) => onChange('country', e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">
                      {}
                    </div>
                  </div>
                </div>
                <div className="col-4 offset-4">
                    <button  type="submit" className="btn btn-dark w-100 mt-5 mb-3">
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