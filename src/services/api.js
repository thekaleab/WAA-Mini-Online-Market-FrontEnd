import { httpReq } from "./http";
import * as AppConst from './constants';
import * as storageService from './storage';

import fake_products from "./fake_products";


// Product end points
const productRoute = AppConst.api.productRoute;

export const getProducts = async () => { 
        const data = await httpReq.get(productRoute)
            .then(result => {
               return result
            })
            .catch(error => {
                Promise.resolve({data: fake_products});
            });
        return data;
    }

export const getProductById = (id) => { 
    return httpReq.get(`${productRoute}/${id}`)
        .then(result => result)
        .catch(error => {
            const product = fake_products.find(p => p.id == id);
            if(product !== null || product !== undefined) {
                return Promise.resolve({data: product });
            } else {
                return Promise.reject();
            }
        });
}

export const getSellerProduct = (id) => httpReq.get(`${productRoute}/seller/${id}`);
export const createProduct = (product) => httpReq.post(productRoute, product);
export const updateProduct = (product) => httpReq.put(`${productRoute}/${product.id}`, product);
export const deleteProduct = (id) => httpReq.delete(`${productRoute}/${id}`);

// Orders end points
const orderRoute = AppConst.api.orderRoute;
export const getOrders = () => httpReq.get(orderRoute);
export const getOrderById = (id) => httpReq.get(`${orderRoute}/${id}`);
export const getUserOrders = (id) => httpReq.get(`${orderRoute}/buyer/${id}`);
export const updateOrder = (order) => httpReq.put(`${orderRoute}/${order.id}`, order);
export const createOrder = (order) => httpReq.post(orderRoute, order);
export const cancelOrder = (id) => httpReq.post(`${orderRoute}/cancel/${id}`);


// Cart end points


// authorization end points
const authRoute = AppConst.api.authRoute;
export const login = (user) => { 
    return httpReq.post(authRoute, user)
            .then(response => response)
            .catch(error => {
                Promise.resolve( { data: {
                        firstName: "Abenezer", lastName: "Mamuyea",
                        accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MDIyNzI4NiwiaWF0IjoxNjUwMjIxMjg2fQ.ev4oJMpYb30MOHR6b9phBeo6uWLryS8hUgWOkisBFRIOwC8zawDGhEjEkMjtsS7O33ZU96_b_ivZpp-nhOAjRA",
                        refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MDIyNzI4NiwiaWF0IjoxNjUwMjIxMjg2fQ.ev4oJMpYb30MOHR6b9phBeo6uWLryS8hUgWOkisBFRIOwC8zawDGhEjEkMjtsS7O33ZU96_b_ivZpp-nhOAjRA",
                        role: {
                            id: 1,
                            name: "ADMIN"
                        }                            
                    
                }});
            });
};

export const logout = (user) => httpReq.post(`${authRoute}/logout`, user);
export const refreshToken = async () => { 
    const token = localStorage.getItem(AppConst.storage.refreshToken);
    if(!token) {
        Promise.reject("Refresh token not found");
        // TODO Route back to login
    }
    try {
        const response =  await httpReq.post(`${authRoute}/refreshToken`, token);
        storageService.storeAccessToken(response.accessToken);
        storageService.storeRefreshToken(response.refreshToken);
    } catch(e) {
        Promise.reject("Refresh token can't be generated, loging again");
    }
}

// User end points
const userRoute = AppConst.api.userRoute;
export const getUsers = () => httpReq.get(userRoute);
export const getUserById = (id) => httpReq.get(`${userRoute}/${id}`);
export const register = (user) => httpReq.post(userRoute, user);


// review end points
const reviewRoute = AppConst.api.reviewRoute;
export const getReviews = () => httpReq.get(reviewRoute);

// admin end points
const adminRoute = AppConst.api.adminRoute;
export const updateUserStatus = (id, status) => httpReq.post(`${adminRoute}/approve/seller/${id}`, status);
export const updateReviewStatus = (id, status) => httpReq.post(`${adminRoute}/approve/review/${id}`, status);

// roles
const roleRoute = AppConst.api.roleRoute;
export const getRoles = async() => {
        return httpReq.get(roleRoute)
                .then(result => result)
                .catch(err =>
                    Promise.resolve({  // fallback
                        data: [
                            {id: 1, name: 'ADMIN'},
                            {id: 2, name: 'BUYER'},
                            {id: 3, name: 'SELLER'}
                        ]
                    })
                );        
};


// fake payment 
export const getStripSecrete =  (total) => Promise.resolve({ data: {
    clientSecret: 'pi_1DqfHd2eZvKYlo2CuJu7a7Ci_secret_mhjmsxBEPxbVvuNrXPsokvJX7'
}});




