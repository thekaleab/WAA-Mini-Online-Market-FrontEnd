import { Fragment, useEffect, useState } from 'react';
import { Nav, Tab, Row, Col, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as api from "../../services/api";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [products, setProducts ] = useState([]);

    const [refreshUser, setRefreshUser] = useState(false);
    const [refreshProduct, setRefreshProduct] = useState(false);

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
    }, [refreshUser]);

    useEffect(() => {
        api.getProducts()
            .then(result => setProducts(result.data))
            .catch(error => setProducts([]))
    }, [refreshProduct]);

    

    return(
        <div>
            <div className="container py-5 ">
                <div className="row py-5 justify-content-center align-content-center">
                    <Tab.Container variant="tabs" id="left-tabs-example" defaultActiveKey="tab1" transition={false}> 
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
                                        <h4 className="text-center mb-5">Sellers</h4>
                                        <Seller data={sellers}  onRefresh={() => setRefreshUser(!refreshUser)} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <h4 className="text-center mb-5">Buyers</h4>
                                        <Buyer data={buyers} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab3">
                                        <h4 className="text-center mb-5">Products</h4>
                                        <Product data={products} onRefresh={() => setRefreshProduct(!refreshProduct)} />
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
    const onChangeApprovalStatus = (seller) => {
        api.updateUserStatus(seller.id, {status: true})
        .then(result => { 
            toast.success("Seller approved");
            props.onRefresh();
        })
        .catch(error => toast.error("Can't approve seller"))
    }

    const rowData = sellers.map((seller, index) => {
        return(
                <tr key={seller.id}>
                    <td>{index+1}</td>
                    <td>{`${seller.firstName} ${seller.lastName}`}</td>
                    <td>{seller.isSellerApproved ? 'Yes' : 'No'}</td>
                    <td className="text-center">
                        <button onClick={()=> onChangeApprovalStatus(seller)} 
                            title="Change Approval status" 
                            disabled={seller.isSellerApproved === true}
                            className="btn btn-xs  btn-outline-dark">
                            <i className="fa fa-check"></i>
                        </button>
                    </td>
                </tr>
        )
    })

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Approved</th>
                    <th className="text-center">Approve ?</th>
                </tr>
            </thead>
            <tbody>
                {rowData}
            </tbody>
        </Table>
    )
}



const Buyer = (props) => {
    const buyers = props.data;

    const rowData = buyers.map((buyer, index) => {
        return(
                <tr key={buyer.id}>
                    <td>{index+1}</td>
                    <td>{`${buyer.firstName} ${buyer.lastName}`}</td>
                    <td>{buyer.email}</td>
                </tr>
        )
    })

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {rowData}
            </tbody>
        </Table>
    )
}


const Product = (props) => {
    const products = props.data;

    const rowData = products.map((product, index) => {
        product.showReview = true;
        return(<Fragment key={product.id}>
                <tr key={product.id}>
                    <td>
                        {product.name }    
                    </td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
                {product.showReview && <Review data={product} onRefresh={()=> props.onRefresh()} />}
            </Fragment>
        )
    })

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                {rowData}
            </tbody>
        </Table>
    )
}

const Review = (props) => {
    const product = props.data;
    // const [reviews, setReviews] = useState([]);
    const reviews = product.reviews;
    // useEffect(()=> {
    //     api.getProductReviews()
    //         .then(result => setReviews(result.data))
    //         .catch(err => err);
    // }, [props.data]);

    const onChangeApprovalStatus = (review) => {
        api.updateReviewStatus(review.id, {productId: product.id , status: true})
        .then(result => { 
            toast.success("Review approved");
            props.onRefresh(); 
        })
        .catch(error => toast.error("Can't approve review"))
    }

    const rowData = reviews?.map((review, index) => {
        return(
                <tr key={review.id}>
                    <td>{index+1}</td>
                    <td>{review.content}</td>
                    <td>{review.approved ? 'Yes' : 'No'}</td>
                    <td className="text-center">
                        <button onClick={()=> onChangeApprovalStatus(review)} 
                            title="Change Approval status" 
                            disabled={review.approved === true}
                            className="btn btn-xs  btn-outline-dark">
                            <i className="fa fa-check"></i>
                        </button>
                    </td>
                </tr>
        )
    })

    return (
        <>
        {
            reviews?.length == 0 ? <></> :
            <tr>
                <td colSpan={3} className="ps-5 ms-5 pb-0 pe-0">
                    <div className="w-100 ps-5">
                        <h6>Product Reviews</h6>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Content</th>
                                    <th>Approved</th>
                                    <th className="text-center">Approve ?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowData}
                            </tbody>
                        </Table>
                    </div>
                </td>   
            </tr>
        }
        </>
    )
}