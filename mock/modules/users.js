import Mock from 'mockjs'
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
Mock.mock(new RegExp("/users"+"/\?"),"get",(opts)=>{
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