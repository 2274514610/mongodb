import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
    // baseURL: 'http://192.168.31.183'
    // baseURL: '/api',
}, function (err) {
    return Promise.reject(err)
});

//响应拦截
instance.interceptors.response.use(res => res.data, err => Promise.reject(err));

//请求拦截
instance.interceptors.request.use(config => {
    let token = Cookies.get('token');
    if (token) {
        config.headers = {
            ...config.headers,
            token
        }
    }
    return config;
});

export default instance