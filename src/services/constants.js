const storage = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    user: 'user',
    cart: 'cart'
}

const  api = {
    baseURL: 'http://localhost:8081/api/v1',
    orderRoute: '/orders',
    productRoute: '/products', 
    authRoute: '/authenticate',
    roleRoute: '/roles',
    userRoute: '/users',
    reviewRoute: '/reviews',
    imageAsset: 'http://localhost:8081/static/images',
    adminRoute: '/admin'
};



export { storage, api };
