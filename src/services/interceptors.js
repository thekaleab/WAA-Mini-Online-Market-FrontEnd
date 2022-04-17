import * as AppConst from './constants';

const corsInterceptor = (config) => {
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    return config;
}

const authInterceptor = (config) => {
    const accessToken = localStorage.getItem(AppConst.storage.accessToken);
    if(accessToken != null){
        config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}


export { corsInterceptor, authInterceptor };