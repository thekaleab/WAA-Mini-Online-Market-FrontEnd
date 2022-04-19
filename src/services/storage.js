import * as AppConst from "./constants";

export const storeUser = (data) => {
    if(data === null || data === undefined) {
        return
    }
    localStorage.setItem(AppConst.storage.user, JSON.stringify(data));  
}

export const loadUser = () => {
    return JSON.parse(localStorage.getItem(AppConst.storage.user));
}

export const storeAccessToken = (data) => {
    if(data === null || data === undefined) {
        return
    }
    localStorage.setItem(AppConst.storage.accessToken, data);
}

export const loadAccessToken = () => {
    return localStorage.getItem(AppConst.storage.accessToken);
}

export const storeRefreshToken = (data) => {
    if(data === null || data === undefined) {
        return
    }
    localStorage.setItem(AppConst.storage.refreshToken, data);
}

export const loadRefreshToken = () => {
    return localStorage.getItem(AppConst.storage.refreshToken);
}

export const clearUserData = () => {
    localStorage.removeItem(AppConst.storage.user);
    localStorage.removeItem(AppConst.storage.accessToken);
    localStorage.removeItem(AppConst.storage.refreshToken);
}


export const storeCart = (data) => {
    if(data === null || data === undefined) {
        return
    }
    localStorage.setItem(AppConst.storage.cart, JSON.stringify(data));
}

export const loadCart = () => {
    return JSON.parse(localStorage.getItem(AppConst.storage.cart));
}