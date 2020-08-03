<template>
  <el-card>
    <NavigationPath :pathArray="pathArray" />
    <div id="main" style="width:600px;height:400px;"></div>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
let echarts = require("echarts");
export default {
  name: "goodscategorys",
  data() {
    return {
      pathArray: ["数据统计", "数据报表"], //路径导航数组
      
    };
  },
  components: {
    NavigationPath,
  },
  mounted() {
      this.useEchart();
  },
  methods: {
    async useEchart(){
        let myChart = echarts.init(document.getElementById("main"));
        // const res = await this.$http.get(`reports/type/1`);

        let option1 = {
            title:{
                text:"堆叠区域图"
            },
            tooltip:{
            },
            legend:{
                data:["销量"]
            },
            xAxis:{
                data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis:{},
            series:[{
                name:"销量",
                type:"bar",
                data:[5,20,36,10,10,20]
            }]
        }

        myChart.setOption(option1);
    }
  },
};
</script>

<style></style>
