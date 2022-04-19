const storage = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
    user: 'user',
    cart: 'cart'
}

const  api = {
    baseURL: 'http://172.24.192.1:8080/api/v1',
    orderRoute: '/orders',
    productRoute: '/products', 
    authRoute: '/authenticate',
    roleRoute: '/roles',
    userRoute: '/users'
};



export { storage, api };
