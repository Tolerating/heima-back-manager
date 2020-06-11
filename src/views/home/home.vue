<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    你的logo
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <h2>后台管理系统</h2>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" @click.prevent="logout" class="logout">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">
            <el-menu default-active="2" :unique-opened="true" :router="true">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                        <el-menu-item index="users">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户列表</span>
                        </el-menu-item>
                    
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                        <el-menu-item index="2-1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">角色列表</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">权限列表</span>
                        </el-menu-item>
                    
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">商品分类</span>
                    </el-menu-item>                    
                </el-submenu>
                 <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                        <el-menu-item index="4-1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">订单列表</span>
                        </el-menu-item>
                        <el-menu-item index="4-2">选项2</el-menu-item>
                    
                </el-submenu>
                 <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                        <el-menu-item index="5-1">选项1</el-menu-item>
                        <el-menu-item index="5-2">选项2</el-menu-item>
                    
                </el-submenu>
                
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    name:"home",
    data(){
        return{}
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$message.success('退出成功');
            this.$router.push({name:'login'});
        }
    },
    beforeCreate(){
        const token = localStorage.getItem('token');
        if(!token){
            this.$router.push({name:'login'});
        }
    }
}
</script>

<style lang="scss">
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;

    .middle {
        text-align: center;
    }

    .logout {
        line-height: 60px;
        text-decoration: none;
    }
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
}
</style>
