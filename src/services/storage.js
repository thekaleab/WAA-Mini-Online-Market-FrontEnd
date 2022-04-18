import * as AppConst from "./constants";

export const storeUser = (user) => {
    localStorage.setItem(AppConst.storage.user, JSON.stringify(user));
}

export const loadUser = () => {
    return localStorage.getItem(JSON.parse(AppConst.storage.use));
}

export const storeAccessToken = (token) => {
    localStorage.setItem(AppConst.storage.accessToken, token);
}

export const loadAccessToken = () => {
    return localStorage.getItem(AppConst.storage.accessToken);
}

export const storeRefreshToken = (token) => {
    localStorage.setItem(AppConst.storage.refreshToken, token);
}

export const loadRefreshToken = () => {
    return localStorage.getItem(AppConst.storage.refreshToken);
}

export const clearUserData = () => {
    localStorage.removeItem(AppConst.storage.user);
    localStorage.removeItem(AppConst.storage.accessToken);
    localStorage.removeItem(AppConst.storage.refreshToken);
}