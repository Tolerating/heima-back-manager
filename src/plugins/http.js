import axios from 'axios'
const MyHttpServer = {};
MyHttpServer.install = (Vue)=>{
    axios.defaults.baseURL = 'http://localhost:8080/';
    Vue.prototype.$http = axios;
}

export default MyHttpServer;