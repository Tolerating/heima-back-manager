import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHttpServer from '@/plugins/http'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false
if(process.env.NODE_ENV !== 'production'){
  console.warn("开发环境1");
  require('../mock');
}

Vue.filter('fmdate',(v)=>{
  return moment(v).format("YYYY-MM-DD");
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
