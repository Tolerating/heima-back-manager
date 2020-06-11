<template>
<div class="login-wrap">
    <el-form label-position="top" ref="login-form" :rules="rules" class="login-form" label-width="80px" :model="formLabelAlign">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-button @click="handleLogin" class="login-btn" type="primary">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formLabelAlign: {
                username: '',
                password: '',
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        handleLogin(){
            this.$refs['login-form'].validate(async (valid)=>{
                if(valid){
                    console.log("发送请求");
                    const res = await this.$http.post('login',this.formdata);
                    console.log(res);
                    const {data,meta:{msg,status}} = res.data;
                    //meta:{msg,status}等同于 const {msg,status} = res.data.meta
                    if(status === 200){
                        localStorage.setItem('token',data.token);
                        this.$message.success(msg);
                        this.$router.push({name:"home"});
                    }else{
                        this.$message.warning(msg);
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss">
.login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form{
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
        .login-btn{
            width: 100%;
        }
    }
}
</style>
