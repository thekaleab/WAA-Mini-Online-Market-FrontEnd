import { httpReq as api, paymentApi } from "./http";
import * as AppConst from './constants';
import * as storageService from './storage';

import fake_products from "./fake_products";


// Product end points
const productRoute = AppConst.api.productRoute;
// const getProducts = () => api.get(productRoute);
// const getProductById = (id) => api.get(`${productRoute}/${id}`);
export const getProducts = () => Promise.resolve({data: fake_products});
export const getProductById = (id) =>{  
    const product = fake_products.find(p => p.id == id);
    if(product !== null || product !== undefined) {
        return Promise.resolve({data: product });
    } else {
        return Promise.reject();
    }
}
export const createProduct = (product) => api.post(productRoute, product);
export const updateProduct = (product) => api.put(`${productRoute}/${product.id}`, product);
export const deleteProduct = (id) => api.delete(`${productRoute}/${id}`);

// Orders end points
const orderRoute = AppConst.api.orderRoute;
export const getOrders = () => api.get(orderRoute);
export const getOrderById = (id) => api.get(`${orderRoute}/${id}`);
export const updateOrder = (order) => api.put(`${orderRoute}/${order.id}`, order);
export const createOrder = (order) => api.post(orderRoute, order);
export const cancelOrder = (id) => api.post(`${orderRoute}/cancel/${id}`);


// Cart end points


// User end points
const authRoute = AppConst.api.authRoute;
export const login = async (user) => { 
    try {
        const { data: userDetail } = await Promise.resolve({data: {
            firstName: "Abenezer", lastName: "Mamuyea",
            accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MDIyNzI4NiwiaWF0IjoxNjUwMjIxMjg2fQ.ev4oJMpYb30MOHR6b9phBeo6uWLryS8hUgWOkisBFRIOwC8zawDGhEjEkMjtsS7O33ZU96_b_ivZpp-nhOAjRA",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1MDIyNzI4NiwiaWF0IjoxNjUwMjIxMjg2fQ.ev4oJMpYb30MOHR6b9phBeo6uWLryS8hUgWOkisBFRIOwC8zawDGhEjEkMjtsS7O33ZU96_b_ivZpp-nhOAjRA",
            role: {
                id: 1,
                name: "ADMIN"
            }                            
        }
    });
    localStorage.setItem(AppConst.storage.accessToken, userDetail.accessToken);
    localStorage.setItem(AppConst.storage.refreshToken, userDetail.refreshToken);
    return userDetail;
} catch (e) {
    Promise.reject(e);
}
};
export const register = async (user) => {  
    return Promise.resolve();
}

export const logout = (user) => api.post(`${authRoute}/logout`, user);
export const refreshToken = async () => { 
    const token = localStorage.getItem(AppConst.storage.refreshToken);
    if(!token) {
        Promise.reject("Refresh token not found");
        // TODO Route back to login
    }
    try {
        const response =  await api.post(`${authRoute}/refreshToken`, token);
        storageService.storeAccessToken(response.accessToken);
        storageService.storeRefreshToken(response.refreshToken);
    } catch(e) {
        Promise.reject("Refresh token can't be generated, loging again");
    }
}


// roles
const roleRoute = AppConst.api.roleRoute;
export const getRoles = () => Promise.resolve({
        data: [
            {id: 1, name: 'ADMIN'},
            {id: 2, name: 'BUY'},
            {id: 3, name: 'SELL'}
        ]
});


// fake payment 
export const getStripSecrete =  (total) => Promise.resolve({ data: {
    clientSecret: 'pi_1DqfHd2eZvKYlo2CuJu7a7Ci_secret_mhjmsxBEPxbVvuNrXPsokvJX7'
}});




