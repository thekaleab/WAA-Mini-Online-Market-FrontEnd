import { Fragment, useEffect, useState } from 'react';
import { Nav, Tab, Row, Col, Table } from 'react-bootstrap';

import * as api from "../../services/api";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [reviews, setReviews ] = useState([]);
    const [products, setProducts ] = useState([]);

    useEffect( () => {
        api.getUsers()
            .then(result => { 
                const sellerUsers = result.data ? result.data.filter(u => u.role?.id == 3): []; // seller role id assumed to be 3
                const buyerUsers = result.data ? result.data.filter(u => u.role?.id == 2): []; // seller role id assumed to be 2
                setUsers(result.data);
                setSellers(sellerUsers);
                setBuyers(buyerUsers);
            })
            .catch(err => setUsers([]))
    }, []);

    useEffect(() => {
        api.getProducts()
            .then(result => setReviews(result.data))
            .catch(error => setReviews([]))
    }, []);

    useEffect(() => {
        api.getReviews()
            .then(result => setReviews(result.data))
            .catch(error => setReviews([]))
    }, []);
        
    

    return(
        <div>
            <div className="container py-5 ">
                <div className="row py-5 justify-content-center align-content-center">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" transition={false}> 
                        <Row>
                            <Col sm={3}>
                            <Nav className="flex-column dark-text">
                                <Nav.Item className="mb-2">
                                    <Nav.Link className="dark-text" eventKey="tab1">Sellers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="my-2">
                                    <Nav.Link className="dark-text"  eventKey="tab2">Buyers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="my-2">
                                    <Nav.Link className="dark-text"  eventKey="tab3">Products</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="tab1">
                                        <h1>Sellers</h1>
                                        <Seller data={sellers} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <h1>Buyers</h1>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab3">
                                        <h1>Products</h1>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )

}



const Seller = (props) => {
    const sellers = props.data;

    const rowData = sellers.map(seller => {
        return(
            <Fragment  key={seller.id}>
                <tr >
                    <td></td>
                    <td>{`${seller.firstName} ${seller.lastName}`}</td>
                    <td>{seller.isSellerApproved ? 'Yes' : 'No'}</td>
                </tr>
            </Fragment>
        )
    })

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Approved</th>
                </tr>
            </thead>
            <tbody>
                {rowData}
            </tbody>
        </Table>
    )
}