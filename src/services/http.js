import axios from "axios";

import { corsInterceptor, authInterceptor } from "./interceptors";
import  * as AppConst  from './constants';


const httpReq = axios.create({
    baseURL: AppConst.api.baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
 
const setCorsHeaderInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        corsInterceptor, 
        (error) => Promise.reject("Can't set cors header")
    );
}

const setAuthHeaderInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        authInterceptor,
        (error) => Promise.reject("Can't set authorization header")
    );
}

const setResponseInterceptor = (axiosInstance) =>  {
    axiosInstance.interceptors.response.use(
        result => result, 
        (err) => {
            if(err.data == 'Token Expired') {
               // set refresh Header
            } else if (err.data == 'refresh token expired') {
                // route page to login;
            }
        }
    );
}

setCorsHeaderInterceptor(httpReq);
setResponseInterceptor(httpReq);
setAuthHeaderInterceptor(httpReq);


export { httpReq };
