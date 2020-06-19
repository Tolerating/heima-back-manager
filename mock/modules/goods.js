import Mock from "mockjs";
/*
 *@description: 商品管理
 *@author: 刘凯
 *@date: 2020-06-18 15:39:20
*/

/* 图片上传 */
Mock.mock(/upload/i,'post',(opts)=>{
    console.warn("请求接口:图片上传",opts);
    return{
        "data": {
            "tmp_path": "tmp_uploads/ccfc5179a914e94506bcbb7377e8985f.png",
            "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592584271802&di=1c128b9791aac688409b07a82e666fab&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F62%2F02%2F01300542526392139955025309984.jpg"
        },
        "meta": {
            "msg": "上传成功",
            "status": 200
        }
    }
});

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

/* 添加商品 */
Mock.mock(/goods/i,'post',(opts)=>{
    console.warn("请求接口:添加商品",opts);
    return{
        "data": {
            "goods_name":"test_goods_name2",
            "goods_cat": "1,2,3",
            "goods_price":20,
            "goods_number":30,
            "goods_weight":40,
            "goods_introduce":"abc",
            "pics":[
              {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
              ],
            "attrs":[
              {
                "attr_id":15,
                "attr_value":"ddd"
              },
              {
                "attr_id":15,
                "attr_value":"eee"
              }
              ]
          },
        "meta": {
            "msg": "添加成功",
            "status": 200
        }
    }
});