import Vue from 'vue'
import moment from 'moment'
/* 时间格式转换 */
Vue.filter('fmdate',(v)=>{
    return moment(v).format("YYYY-MM-DD");
});

/* 强转数值类型 */
Vue.filter('number',(v)=>{
    return Number(v);
});