import Mock from 'mockjs'
/*
 *@description: 角色管理
 *@author: 刘凯
 *@date: 2020-06-14 22:56:50
 *@version: V1.0.5
*/

// 角色列表
Mock.mock(new RegExp('/roles'),'get',(opts)=>{
    console.warn("请求接口:角色列表");
    return {
        "data": [
            {
                "id": 0,
                "roleName": "主管",
                "roleDesc": "技术负责人",
            },
            {
                "id": 31,
                "roleName": "主管1",
                "roleDesc": "技术负责人",
            },
            {
                "id": 32,
                "roleName": "主管2",
                "roleDesc": "技术负责人",
            },
            {
                "id": 33,
                "roleName": "主管3",
                "roleDesc": "技术负责人",
            },
            {
                "id": 34,
                "roleName": "主管4",
                "roleDesc": "技术负责人",
            }

        ],
        "meta": {
            "msg": "获取成功",
            "status": 200
        } 
    }
});