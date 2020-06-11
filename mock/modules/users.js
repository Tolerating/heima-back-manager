import Mock from 'mockjs'
export function getUserList(){
    return{
        url:"/users",
        type:"get",
        data:Mock.mock({
            "data":{
                total:10,
                pagenum:5,
                "users|10":[
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
        })
    }
}