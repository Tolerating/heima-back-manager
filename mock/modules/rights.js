import Mock from "mockjs";
/*
 *@description: 权限管理
 *@author: 刘凯
 *@date: 2020-06-16 18:18:38
*/
/* 所有权限列表 */
Mock.mock(/rights\/[(list)|(tree)$]/i,'get',(opts)=>{
    console.warn("请求接口:所有权限列表",opts);
    const type = opts.url.match(/list|tree/i)[0];
    console.log(type);
    if (type === 'list') {
        return {
            "data": [
                {
                    "id": 101,
                    "authName": "用户列表",
                    "level": "0",
                    "pid": 0,
                    "path": "/users"
                },
                {
                    "id": 102,
                    "authName": "权限列表",
                    "level": "0",
                    "pid": 0,
                    "path": "/rights"
                }
            ],
            "meta": {
                "msg": "获取权限列表成功",
                "status": 200
            }
        }
    }else{
        return{
            data: [
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
                                "id":303,
                                "authName":"编辑用户",
                                "path":null,
                                "children":null
                            },
                            {
                                "id":304,
                                "authName":"删除用户",
                                "path":null,
                                "children":null
                            },
                            {
                                "id":305,
                                "authName":"分配角色",
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
              ],
              meta: {
                msg: '获取权限列表成功',
                status: 200
              }
        }
    }
});

/* 左侧菜单权限 */
Mock.mock(/menus$/i,'get',(opts)=>{
  console.warn("请求接口:左侧菜单权限",opts);
  return{
    "data":
        [
          {
            "id": 101,
            "authName": "用户管理",
            "path": "users",
            "children": [
                {
                    "id": 104,
                    "authName": "用户列表",
                    "path": "users",
                    "children": []
                }
            ]
          },
          {
            "id": 201,
            "authName": "权限管理",
            "path": "rights",
            "children": [
                {
                    "id": 202,
                    "authName": "角色列表",
                    "path": "role",
                    "children": []
                },
                {
                  "id": 202,
                  "authName": "权限列表",
                  "path": "rights",
                  "children": []
                }
            ]
          },
          {
            "id": 301,
            "authName": "商品管理",
            "path": "goods",
            "children": [
                {
                    "id": 302,
                    "authName": "商品列表",
                    "path": "goods",
                    "children": []
                },
                {
                    "id": 303,
                    "authName": "分类参数",
                    "path": "cateparams",
                    "children": []
                },
                {
                    "id": 304,
                    "authName": "商品分类",
                    "path": "goodscate",
                    "children": []
                }
            ]
          },
          {
            "id": 401,
            "authName": "订单管理",
            "path": "orders",
            "children": [
                {
                    "id": 402,
                    "authName": "订单列表",
                    "path": "orders",
                    "children": []
                }
            ]
          },
          {
            "id": 501,
            "authName": "数据统计",
            "path": "reports",
            "children": [
                {
                    "id": 502,
                    "authName": "数据报表",
                    "path": "reports",
                    "children": []
                }
            ]
          }                  
        ],
    "meta": {
        "msg": "获取菜单列表成功",
        "status": 200
    }
  }
});