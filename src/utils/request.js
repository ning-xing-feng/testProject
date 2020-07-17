import axios from 'axios';

import store from '@/store';
import {
    Message,MessageBox 
} from 'element-ui';
import {
    getToken
} from '@/utils/auth';
import http from '@/utils/config'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: http.http,
    timeout: 50000
});
var _this = this
console.log('sessionId', sessionStorage.getItem('token'))
service.interceptors.request.use(

    config => {
        if(sessionStorage.getItem('token')){
            config.headers['sessionId'] = sessionStorage.getItem('token');
        }
      
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(

    response => {
        const res = response.data;
        console.log('ressssssssssssss',res.data)
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            if (res.code === 401) {
                console.log('router',res.code)
                // this.$router.push({
                //     path:'/Login'
                // })
                console.log('res.code',res.code)
                MessageBox.confirm('暂未登录', {
                    confirmButtonText: '去登陆',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(111111111111)
                    store.dispatch('user/login').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }

    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject();
    }
);

export default service;