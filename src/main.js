import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHttpServer from '@/plugins/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
require('./filter/utils');
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false
if(process.env.NODE_ENV !== 'production'){
  console.warn("开发环境1");
  require('../mock');
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
