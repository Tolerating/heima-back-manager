# heima-back-manager
b站视频看至https://www.bilibili.com/video/BV1PJ411X7Jp?p=152
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

### 合并分支
```
1. 切到主分支
2. git merge 分支名
```

### vue过滤器
```js
Vue.filter('过滤器名字',(value)=>{});

//使用
{{datetime | 过滤器名字}}
```