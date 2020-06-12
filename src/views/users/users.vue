<template>
<el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索框 -->
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        fixed
        label="#"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
        <!-- 如果单元格内显示的内容不是字符串(文本),
        需要给被显示的内容包裹一个template
        template内部要用的数据,得设置slot-scope属性
        该属性的值是要用数据create_time的数据源userlist
         -->
         <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
         [slot-scope会自动找上一级的数据源]
         userlist.row就是数组中的每个对象 -->
         <template slot-scope="userlist">
           {{userlist.row.create_time | fmdate}}
         </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
</el-card>
</template>

<script>
export default {
    name: 'users',
    data(){
        return{
            query:'',
            total:-1,
            pagenum:1,
            pagesize:2,
            userlist: []
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        async getUserList(){
            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
            const {meta:{status,msg},data:{users,total,pagenum}} = res.data;
            console.log(res);
            if(status === 200){
                this.userlist = users;
                this.total = total;
                this.$message.success(msg);
            }else{
                this.$message.warning(msg);
            }
        }
    }
}
</script>

<style lang="scss">
.box-card {
    height: 100%;
    .searchRow{
        margin-top: 20px;
    }
    .inputSearch{
        width: 300px;
        margin-right: 10px;
    }
}
</style>
