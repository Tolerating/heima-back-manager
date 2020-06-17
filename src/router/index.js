import Vue from "vue";
import Router from "vue-router";
import login from "./login/login";
import home from "./home/home";
import {Message} from 'element-ui'

Vue.use(Router);

const router = new Router({
  routes: [
    login,
    home,
    {
      path: "/*",
      redirect: "/login",
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if(to.name == 'login'){
    next();
  }else{
    if (!token) {
      Message.warning('请先登录');
      // next({name:"login"});
      router.push({name:'login'});
      return;
    }
    next();
  }
});
export default router;
