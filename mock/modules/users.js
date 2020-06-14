import Mock from 'mockjs'
/*
 *@description: 用户管理
 *@author: 刘凯
 *@date: 2020-06-14 22:57:28
*/
// export function getUserList(){
//     return{
//         url:"/users",
//         type:"get",
//         data:Mock.mock({
//             "data":{
//                 total:10,
//                 pagenum:1,
//                 "users|2":[
//                     {
//                         "id|+1":1,
//                         "username": "@cname",
//                         "mobile":  /^1(5|3|7|8)[0-9]{9}$/,
//                         "type": 1,
//                         "email": "@email()",
//                         "create_time": "@datetime",
//                         "mg_state": true, 
//                         "role_name": "炒鸡管理员"
//                     }
//                 ],
//             },
//             "meta": {
//                 "msg": "获取成功",
//                 "status": 200
//             }
//         })
//     }
// }
/* 获取用户 */
Mock.mock(/\/users[^/]/,"get",(opts)=>{
    console.warn("请求接口:获取用户",opts);
    const {url} = opts;
    let data = {};
    url.split("?")[1].split("&").forEach((item)=>{
        const [key,value] = item.split("=");
        data[key] = value;
    });
    // console.log(url.split("?")[1].split("&")[0].split("="));
    // console.log(data);
    return Mock.mock({
        "data":{
            total:10,
            pagenum:data.pagenum,
            [`users|${data.pagesize}`]:[
                {
                    "id|+1":1,
                    "username": "@cname",
                    "mobile":  /^1(5|3|7|8)[0-9]{9}$/,
                    "type": 1,
                    "email": "@email()",
                    "create_time": "@datetime",
                    "mg_state": true, 
                    "role_name": "炒鸡管理员"
                }
            ],
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    });
});

/* 添加用户 */
Mock.mock(new RegExp("/users"),"post",(opts)=>{
    console.warn("请求接口:添加用户",opts);
    const {username,email,mobile} = JSON.parse(opts.body);
    console.log(JSON.parse(opts.body));
    return Mock.mock({
        "data": {
            "id": 28,
            "username": username,
            "mobile": mobile,
            "type": 1,
            "openid": "",
            "email": email,
            "create_time": "@datetime()",
            "modify_time": null,
            "is_delete": false,
            "is_active": false
        },
        "meta": {
            "msg": "用户创建成功",
            "status": 201
        }
    })
});

/* 删除用户 */
Mock.mock(new RegExp("/users"),"delete",(opts)=>{
    console.warn("请求接口:删除用户",opts);
    return {
        "data": null,
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
});

/* 编辑用户 */
Mock.mock(new RegExp("/users/.$"),"put",(opts)=>{
    console.warn("请求接口:编辑用户",opts);
    return {
        "data": {
            "id": 503,
            "username": "admin3",
            "role_id": 0,
            "mobile": "111",
            "email": "123@123.com"
        },
        "meta": {
            "msg": "更新成功",
            "status": 200
        }
    }
});

/* 更改用户状态 */
Mock.mock(new RegExp("/users"+"/."+"/.$"),"put",(opts)=>{
    console.warn("请求接口:更改用户状态",opts);
    return {
        "data": {
            "id": 566,
            "rid": 30,
            "username": "admin",
            "mobile": "123456",
            "email": "bb@itcast.com",
            "mg_state": 0
          },
          "meta": {
            "msg": "设置状态成功",
            "status": 200
          }
    }
});

/* 根据 ID 查询用户信息 */
Mock.mock(new RegExp("/users(/[0-9]*)"),"get",(opts)=>{
    console.warn("请求接口:根据 ID 查询用户信息",opts);
    return {
        "data": {
            "id": 503,
            "username": "admin3",
            "rid": 32,
            "mobile": "00000",
            "email": "new@new.com"
        },
        "meta": {
            "msg": "查询成功",
            "status": 200
        }
    }
});

/* 分配用户角色 */
Mock.mock(/\/users(\/[0-9]*)(\/\w*)$/,"put",(opts)=>{
    console.warn("请求接口:分配用户角色",opts);
    return {
        "data": {
            "id": 508,
            "rid": "30",
            "username": "asdf1",
            "mobile": "123123",
            "email": "adfsa@qq.com"
        },
        "meta": {
            "msg": "设置角色成功",
            "status": 200
        }
    }
});