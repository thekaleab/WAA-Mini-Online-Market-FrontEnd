const storage = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    user: 'user',
    cart: 'cart'
}

const  api = {
    baseURL: process.env.REACT_APP_API_URL,
    orderRoute: '/orders',
    productRoute: '/products', 
    authRoute: '/authenticate',
    roleRoute: '/roles',
    userRoute: '/users',
    reviewRoute: '/reviews',
    imageAsset: '/static/images',
    adminRoute: '/admin',
    uploadRoute: '/upload',
};

export const imgSrcBase = `${api.baseURL}${api.imageAsset}`


export { storage, api };
