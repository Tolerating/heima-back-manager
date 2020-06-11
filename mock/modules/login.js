import Mock from 'mockjs'
//登录后台
export function login(){
    return {
        url:'/login',
        type:'post',
        data:{
            "data": {
                "id": 500,
                "rid": 0,
                "username": "admin",
                "mobile": "123",
                "email": "123@qq.com",
                "token": Mock.Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32)
            },
            "meta": {
                "msg": "登录成功",
                "status": 200
            }
        }
    }
}