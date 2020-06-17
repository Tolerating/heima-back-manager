import Mock from 'mockjs'
/*
 *@description: 角色管理
 *@author: 刘凯
 *@date: 2020-06-14 22:56:50
 *@version: V1.0.5
*/

// 角色列表
Mock.mock(new RegExp('/roles'),'get',(opts)=>{
    console.warn("请求接口:角色列表",opts);
    return {
        "data": [
            {
                "id": 32,
                "roleName": "主管",
                "roleDesc": "技术负责人",
                "children":[
                    {
                        "id":101,
                        "authName":"商品管理",
                        "path":null,
                        "children":[
                            {
                                "id":201,
                                "authName":"商品列表",
                                "path":"/users",
                                "children":[
                                    {
                                        "id":212,
                                        "authName":"添加商品",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":222,
                                        "authName":"商品修改",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":232,
                                        "authName":"商品刪除",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":242,
                                        "authName":"更改商品图片",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":252,
                                        "authName":"更改商品属性",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":262,
                                        "authName":"获取商品详情",
                                        "path":null,
                                        "children":null
                                    },
                                ] 
                            },
                        ]
                    },
                    {
                        "id":401,
                        "authName":"用户管理",
                        "path":"/users",
                        "children":[
                            {
                                "id":402,
                                "authName":"用户列表",
                                "path":null,
                                "children":[
                                    {
                                        "id":403,
                                        "authName":"添加用户",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":404,
                                        "authName":"编辑用户",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":405,
                                        "authName":"删除用户",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":406,
                                        "authName":"分配角色",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":407,
                                        "authName":"更改状态",
                                        "path":null,
                                        "children":null
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        "id":3,
                        "authName":"权限管理",
                        "path":null,
                        "children":[
                            {
                                "id":301,
                                "authName":"角色列表",
                                "path":"/role",
                                "children":[
                                    {
                                        "id":302,
                                        "authName":"添加用户",
                                        "path":null,
                                        "children":null
                                    },
                                    {
                                        "id":306,
                                        "authName":"更改状态",
                                        "path":null,
                                        "children":null
                                    },
                                ]
                            },
                            {
                                "id":204,
                                "authName":"权限列表",
                                "path":"/rights",
                                "children":null
                            },
                        ]
                    },
                ]
            },
        ],
        "meta": {
            "msg": "获取成功",
            "status": 200
        } 
    }
});

/* 删除角色指定权限 */
Mock.mock(/roles\/[0-9]*\/rights\/[0-9]*$/i,'delete',(opts)=>{
    console.warn("请求接口:删除角色指定权限",opts);
    return{
        "data": [
            {
                "id": 101,
                "authName": "商品管理",
                "path": null,
                "children": [
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "path": null,
                        "children": [
                            {
                                "id": 105,
                                "authName": "添加商品",
                                "path": null
                            },
                            {
                                "id": 116,
                                "authName": "修改",
                                "path": null
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {
            "msg": "取消权限成功",
            "status": 200
        }
    }
});
/* 角色授权 */
Mock.mock(/roles\/[0-9]*\/rights$/i,'post',(opts)=>{
    console.warn("请求接口:角色授权",opts); 
    return{
        "data": null,
        "meta": {
            "msg": "更新成功",
            "status": 200
        }
    }
})

/* 添加角色 */
Mock.mock(/roles$/i,'post',(opts)=>{
    console.warn("请求接口:添加角色",opts); 
    return{
        "data": {
            "roleId": 40,
            "roleName": "admin2",
            "roleDesc": "admin2Desc"
        },
        "meta": {
            "msg": "创建成功",
            "status": 200
        }
    }
})

/* 删除角色 */
Mock.mock(/roles\/[0-9]*$/i,'delete',(opts)=>{
    console.warn("请求接口:删除角色",opts); 
    return{
        "data": null,
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
})

/* 添加角色 */
Mock.mock(/roles$/i,'post',(opts)=>{
    console.warn("请求接口:添加角色",opts); 
    return{
        "data": {
            "roleId": 40,
            "roleName": "admin2",
            "roleDesc": "admin2Desc"
        },
        "meta": {
            "msg": "创建成功",
            "status": 200
        }
    }
})

/* 编辑角色 */
Mock.mock(/roles\/[0-9]*$/i,'put',(opts)=>{
    console.warn("请求接口:编辑角色",opts); 
    return{
        "data": {
            "roleId": 31,
            "roleName": "测试角色",
            "roleDesc": "测试角色描述"
        },
        "meta": {
            "msg": "更新成功",
            "status": 200
        }
    }
})