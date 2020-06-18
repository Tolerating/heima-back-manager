import Mock from 'mockjs'
/*
 *@description: 商品分类管理
 *@author: 刘凯
 *@date: 2020-06-18 21:04:16
*/

/* 商品分类数据列表 */
Mock.mock(/categories\?[\w=]+$/i,'get',(opts)=>{
    console.warn("请求接口:商品分类数据列表",opts);
    return{
        "data": [
            {
                "cat_id": 1,
                "cat_name": "大家电",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 3,
                        "cat_name": "电视",
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 6,
                                "cat_name": "曲面电视",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 7,
                                "cat_name": "海信",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
});








/*
 *@description: 分类参数管理
 *@author: 刘凯
 *@date: 2020-06-18 22:55:58
*/
/* 参数列表 */
Mock.mock(/categories\/[0-9]+\/attributes\?[\w=]+$/i,'get',(opts)=>{
    console.warn("请求接口:参数列表",opts);
    const {url} = opts;
    let data = {};
    url.split("?")[1].split("&").forEach((item)=>{
        const [key,value] = item.split("=");
        data[key] = value;
    });
    console.log(data);
    if (data.sel === 'many') {
        return{
            "data": [
                {
                    "attr_id": 1,
                    "attr_name": "版式",
                    "cat_id": 22,
                    "attr_sel": "many",
                    "attr_write": "manual",
                    "attr_vals": "aa,ee,ff,gg"
                },
                {
                    "attr_id": 2,
                    "attr_name": "内存",
                    "cat_id": 20,
                    "attr_sel": "many",
                    "attr_write": "manual",
                    "attr_vals": "4G,8G,16G"
                },
                {
                    "attr_id": 3,
                    "attr_name": "CPU主频",
                    "cat_id": 23,
                    "attr_sel": "many",
                    "attr_write": "manual",
                    "attr_vals": "1.5Hz,2.0HzG,3.2Hz"
                }
            ],
            "meta": {
                "msg": "获取成功",
                "status": 200
            }
        } 
    }else{
        return{
            "data": [
                {
                    "attr_id": 1,
                    "attr_name": "主体-商品名称",
                    "cat_id": 22,
                    "attr_sel": "only",
                    "attr_write": "list",
                    "attr_vals": "TCL电视"
                },
                {
                    "attr_id": 2,
                    "attr_name": "系统-智能电视",
                    "cat_id": 20,
                    "attr_sel": "only",
                    "attr_write": "list",
                    "attr_vals": "智能电视"
                },
                {
                    "attr_id": 3,
                    "attr_name": "外观-壁挂安装",
                    "cat_id": 23,
                    "attr_sel": "only",
                    "attr_write": "list",
                    "attr_vals": "支持"
                }
            ],
            "meta": {
                "msg": "获取成功",
                "status": 200
            }
        }
    }
   
});