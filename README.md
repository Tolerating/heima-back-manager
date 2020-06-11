# heima-back-manager

### 目录介绍
```
```

### element-ui的安装与导入
```
npm i element-ui -S

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

### 项目分支1 - login
> 该分支专门写登录功能
> git checkout -b 分支名


### 利用axios编写一个ajax请求的vue插件
```js
import axios from 'axios'
const MyHttpServer = {};
MyHttpServer.install = (Vue,options)=>{
    Vue.prototype.$http = axios;
}

export default MyHttpServer;

//在main.js中使用
import httpServer from '@/plugins/http'
Vue.use(httpServer);
```