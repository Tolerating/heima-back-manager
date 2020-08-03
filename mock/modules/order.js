import Mock from 'mockjs';
/*
 *@description: 订单管理接口
 *@author: 刘凯
 *@date: 2020-08-03 23:20:19
*/
/* 添加商品 */
Mock.mock(/order/i,'get',(opts)=>{
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
                    "order_id|+1": 1,
                    "user_id|+1": 13,
                    "order_number|1-9999999999": 86543,
                    "order_price|100-10000": 322,
                    "order_pay": "1",
                    "is_send": "是",
                    "trade_no": "",
                    "order_fapiao_title": "个人",
                    "order_fapiao_company": "",
                    "order_fapiao_content": "办公用品",
                    "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
                    "pay_status": "1",
                    "cat_deleted":"false",
                    "create_time": 1508331565,
                    "update_time": 1508331565
                }
            ]
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    })
});