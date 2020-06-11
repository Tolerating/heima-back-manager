import Vue from 'vue'
import Router from 'vue-router'
import login from './login/login'
import home from './home/home'

Vue.use(Router)

export default new Router({
  routes: [
    login,
    home,
    {
      path:'/*',
      redirect:'/login'
    }
  ]
})
