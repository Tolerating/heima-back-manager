<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->   
    <NavigationPath :pathArray="pathArray"/>
    <!-- 2.搜索框 -->

    <!-- 3.表格 -->
    <el-table :data="rightlist" border height="400px" style="width: 100%">
        <el-table-column fixed label="#" type="index" width="60">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="80">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level == 0">一级</span>
            <span v-if="scope.row.level == 1">二级</span>
            <span v-if="scope.row.level == 2">三级</span>
          </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
import NavigationPath from '@/components/navigationPath'
export default {
  name:"right",
  data:function(){
    return{
      pathArray:['权限管理','权限列表'],
      rightlist:[]
    }
  },
  components:{
    NavigationPath
  },
  created(){
    this.getRightList();
  },
  methods:{
    async getRightList(){
      const res = await this.$http.get(`rights/list`);
      console.log(res);
      this.rightlist = res.data.data;
    }
  }
}
</script>

<style>

</style>