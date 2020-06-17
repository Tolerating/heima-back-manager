<template>
  <el-breadcrumb class="path" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        
        <el-breadcrumb-item v-for="(item,index) in pathArray" :key="index">
            {{item}}
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item>用户列表</el-breadcrumb-item> -->
    </el-breadcrumb>
</template>

<script>
export default {
    name:"NavigationPath",
    props:{
        pathArray:{
            required:true,
            type:Array,
            default:function(){
                return [];
            }
        }
    }
}
</script>

<style>
.path{
    margin-bottom: 20px;
}
</style>