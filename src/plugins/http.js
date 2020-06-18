import axios from 'axios'
const MyHttpServer = {};
MyHttpServer.install = (Vue)=>{
    axios.defaults.baseURL = 'http://localhost:8080/';
    // 添加请求拦截器
    axios.interceptors.request.use(function (config){
        console.log(config.url);
        if (config.url !== 'login') {
            config.headers['Authorization'] = localStorage.getItem('token') || '';
        }
        return config;
    },function(error){
        return Promise.reject(error);
    });
    // 添加响应拦截器
    // axios.interceptors.request.use(function(config){
        
    // },function(error){
    //     return Promise.reject(error);
    // });
    Vue.prototype.$http = axios;
}

export default MyHttpServer;