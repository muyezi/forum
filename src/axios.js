import axios from 'axios'
import qs from 'qs'
import router from './router'
import {
  Toast
} from 'vue-ydui/dist/lib.rem/dialog';

// 创建实例时设置配置的默认值
const http = axios.create({
  baseURL: '/'
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 给所有post请求加accesstoken参数
  if (config.method === 'post') {
    let accesstoken = localStorage.getItem('accesstoken')
    const data = config.data || {}
    if (!data.accesstoken) {
      config.data = qs.stringify(Object.assign(data, {
        accesstoken
      }))
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    if (response.config.direct) {
      return response.data
    }
    // 对响应数据做点什么
    var res = response.data
    return res.data;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      var err_msg = error.response.data.error_msg
      if (error.response.status === 401) {
        // router.replace({
        //   name: 'login',
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // });
      } else {
        Toast({
          mes: err_msg,
          timeout: 1500
        })
      }
    }
    return Promise.reject(error);
  });

export default http