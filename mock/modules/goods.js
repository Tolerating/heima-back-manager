import Mock from "mockjs";
/*
 *@description: 商品管理
 *@author: 刘凯
 *@date: 2020-06-18 15:39:20
*/
/* 商品列表数据 */
Mock.mock(/goods/i,'get',(opts)=>{
    console.warn("请求接口:商品列表数据",opts);
    const {url} = opts;
    let data = {};
    url.split("?")[1].split("&").forEach((item)=>{
        const [key,value] = item.split("=");
        data[key] = value;
    });
    return Mock.mock({
        "data": {
            "total": 50,
            "pagenum": data.pagenum,
            [`goods|${data.pagesize}`]: [
                {
                    "goods_id+1": 1,
                    "goods_name": "@cword(6,10)",
                    "goods_price|1-100": 100,
                    "goods_number|100-200": 150,
                    "goods_weight|1-50": 20,
                    "goods_state": null,
                    "add_time": "@datetime()",
                    "upd_time": "@datetime()",
                    "hot_mumber": 0,
                    "is_promote": false
                }
            ]
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    })
});