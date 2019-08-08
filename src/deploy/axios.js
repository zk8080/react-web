import axios from 'axios';
import {loading} from '@utils';
import { message } from 'antd';

axios.defaults.timeout = 60 * 1000;
axios.defaults.baseURL = '/wms';
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log( '请求拦截器！', config );
    // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    loading.showLoading();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('响应拦截器！');
    loading.hideLoading();
    if(response.data.code != 0 || response.data.code != '00'){
        message.error(response.data.msg);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    loading.hideLoading();
    if(error && error.response){
        switch( error.response.status ){
            case 404:
                message.error('请求错误，未找到该资源');
                break;
            case 504:
                    message.error('请求超时');
                    break;
        }
        
    }
    console.log(error.response.status,'responseresponseresponse');
    return Promise.reject(error);
});
