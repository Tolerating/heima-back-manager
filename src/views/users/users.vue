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
            <el-input placeholder="请输入内容" clearable @clear="loadUserList" v-model="query" class="inputSearch">
                <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="showAddUserDia">添加用户</el-button>
        </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
        <el-table-column fixed label="#" type="index" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
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
        <el-table-column prop="mg_state" label="用状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change="changeMsgState(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" @click="showDeleteUserMsg(scope.row.id)" circle></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum | number" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form ref="ruleAddForm" :rules="addRules" :model="addForm">
            <el-form-item label="用户名" label-width="100px" prop="username">
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100px" prop="password">
                <el-input v-model="addForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="addForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="addForm">
            <el-form-item label="用户名" label-width="100px" prop="username">
                <el-input v-model="addForm.username" disabled auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="addForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    name: 'users',
    data() {
        return {
            query: '',
            total: -1,
            pagenum: "1",
            pagesize: 2,
            userlist: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit:false,
            addForm: {
                username: "",
                password: "",
                email: "",
                mobile: "",
            },
            addRules: {
                username: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        // 获取用户
        async getUserList() {
            const res = await this.$http.get('users', {
                params: {
                    "query": this.query,
                    "pagenum": this.pagenum,
                    "pagesize": this.pagesize
                }
            });
            const {
                meta: {
                    status,
                    msg
                },
                data: {
                    users,
                    total,
                    pagenum
                }
            } = res.data;
            console.log(res);
            if (status === 200) {
                this.userlist = users;
                this.total = total;
                this.pagenum = pagenum;
                this.$message.success(msg);
            } else {
                this.$message.warning(msg);
            }
        },
        // 分页组件,每页显示总数变化
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.pagenum = 1;
            this.getUserList();
        },
        // 分页组件,当前页变化
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },
        // 搜索用户
        searchUser() {
            this.pagenum = 1;
            this.getUserList();
        },
        // 搜索框清空后,重新获取用户
        loadUserList() {
            this.pagenum = 1;
            this.getUserList();
        },
        // 添加用户 - 打开对话框
        showAddUserDia(){
          this.addForm = {};
          this.dialogFormVisibleAdd = true;
        },
        // 添加用户
        addUser() {
            this.dialogFormVisibleAdd = false;
            console.log(this.$refs);
            this.$refs["ruleAddForm"].validate(async (valid) => {
                if (valid) {
                    const res = await this.$http.post("users", this.addForm);
                    console.log(res);
                    const {
                        meta: {
                            msg,
                            status
                        },
                        data
                    } = res.data;
                    if (status === 201) {
                        this.$message.success(msg);
                        // 更新视图(开发环境下模拟数据随机生成,看不到添加的数据)
                        // this.getUserList();
                        // 清空文本框
                        // this.addForm = {};
                        // 另一种清空方法
                        for (const key in this.addForm) {
                            if (this.addForm.hasOwnProperty(key)) {
                                this.addForm[key] = "";
                            }
                        }
                    } else {
                        this.$message.warning(msg);
                    }
                }
            });
        },
        // 删除用户,打开对话框
        showDeleteUserMsg(id) {
            this.$confirm('删除用户?, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`users/${id}`);
                console.log(res);
                if (res.data.meta.status === 200) {
                  this.pagenum = 1;
                  this.getUserList();
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 编辑用户 - 显示对话框
        showEditUserDia(user){
          console.log(user);
          this.addForm = user;
          this.dialogFormVisibleEdit = true;
        },
        // 编辑用户,发送请求
        async editUser(){
          this.dialogFormVisibleEdit = false;
          const res = await this.$http.put(`users/${this.addForm.id}`);
          console.log(res);
          const {meta:{msg,status}} = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getUserList();
            this.$message.success(msg);
          }else{
            this.$message.warning(msg);
          }
        },
        // 更改用户状态
        async changeMsgState(user){
          const res = await this.$http.put(`users/${user.id}/${user.type}`);
          const {meta:{msg,status}} = res.data;
          if (status === 200) {
            this.$message.success(msg);
          }else{
            this.$message.warning(msg);
          }
        },

    }
}
</script>

<style lang="scss">
.box-card {
    height: 100%;

    .searchRow {
        margin-top: 20px;
    }

    .inputSearch {
        width: 300px;
        margin-right: 10px;
    }
}
</style>
