import { httpReq as api } from "./http";
import * as AppConst from './constants';


// Product end points
const productRoute = AppConst.api.productRoute;
// const getProducts = () => api.get(productRoute);
// const getProductById = (id) => api.get(`${productRoute}/${id}`);
export const getProducts = () => api.get('https://fakestoreapi.com/products'); // temprary, disable this.
export const getProductById = (id) => api.get(`https://fakestoreapi.com/products/${id}`); // temporary, disable this
export const createProduct = (product) => api.post(productRoute, product);
export const updateProduct = (product) => api.put(`${productRoute}/${product.id}`, product);
export const deleteProduct = (id) => api.delete(`${productRoute}/${id}`);

// Orders end points
const orderRoute = AppConst.api.orderRoute;
export const getOrders = () => api.get(orderRoute);
export const getOrderById = (id) => api.get(`${orderRoute}/${id}`);
export const updateOrder = (order) => api.put(`${orderRoute}/${order.id}`, order);
export const createOrder = (order) => api.save(orderRoute, order);
export const cancelOrder = (id) => api.post(`${orderRoute}/cancel/${id}`);


// Cart end points


// User end points
const authRoute = AppConst.api.authRoute;
export const login = async (user) => { 
    try {
        const { data: userDetail } = await api.post(`${authRoute}/login`, user);
        localStorage.setItem(AppConst.storage.accessToken, userDetail.accessToken);
        localStorage.setItem(AppConst.storage.refreshToken, userDetail.refreshToken);
        return userDetail;
    } catch (e) {
        Promise.reject(e);
    }
};
export const register = (user) => api.post(`${authRoute}/register`, user);
export const logout = (user) => api.post(`${authRoute}/logout`, user);
export const refreshToken = async () => { 
    const token = localStorage.getItem(AppConst.storage.refreshToken);
    if(!token) {
        Promise.reject("Refresh token not found");
        // TODO Route back to login
    }
    try {
        const response =  await api.post(`${authRoute}/refreshToken`, token);
        localStorage.setItem(AppConst.storage.accessToken, response.accessToken);
        localStorage.setItem(AppConst.storage.refreshToken, response.refreshToken);
    } catch(e) {
        Promise.reject("Refresh token can't be generated, loging again");
    }
}

// roles
const roleRoute = AppConst.api.roleRoute;
export const getRoles = () => api.get(roleRoute);
