import axios from 'axios'
const MyHttpServer = {};
MyHttpServer.install = (Vue)=>{
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') || ''
    Vue.prototype.$http = axios;
}

export default MyHttpServer;