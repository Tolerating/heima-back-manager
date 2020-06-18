<template>
<el-card class="box-card">
    <NavigationPath :pathArray="pathArray"/>
    <!-- 2.搜索框 -->
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" clearable @clear="loadUserList" v-model="query" class="inputSearch">
                <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
        </el-col>
    </el-row>

    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
        <el-table-column fixed label="#" type="index" width="60">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="80">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建日期">
            <template slot-scope="userlist">
                {{userlist.row.add_time | fmdate}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleteUserMsg(scope.row.id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum | number" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

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

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
        <el-form>
            <el-form-item label="用户名" label-width="100px">
                {{currUserName}}
            </el-form-item>
            <el-form-item label="角色" label-width="100px">
                <el-select v-model="currRoleId" placeholder="请选择角色">
                    <el-option label="请选择" disabled="" :value="-1"></el-option>
                    <el-option v-for="(item,index) in roles" :label="item.roleName" :value="item.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
            <el-button type="primary" @click="setRole">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
import NavigationPath from '@/components/navigationPath'
export default {
    name: 'users',
    data() {
        return {
            pathArray:['商品管理','商品列表'],//路径导航数组
            query: '',
            total: -1,
            pagenum: "1",
            pagesize: 2,
            userlist: [],
            dialogFormVisibleEdit: false,
            dialogFormVisibleRole:false,
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
            },
            //分配角色
            currRoleId:-1,
            currUserId:-1,
            currUserName:"",
            // 保存所有角色数据
            roles:[]
        }
    },
    components:{
        NavigationPath,
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        // 获取用户
        async getGoodsList() {
            const res = await this.$http.get('goods', {
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
                    goods,
                    total,
                    pagenum
                }
            } = res.data;
            console.log(res);
            if (status === 200) {
                this.userlist = goods;
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
            this.getGoodsList();
        },
        // 分页组件,当前页变化
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getGoodsList();
        },
        // 搜索用户
        searchUser() {
            this.pagenum = 1;
            this.getGoodsList();
        },
        // 搜索框清空后,重新获取用户
        loadUserList() {
            this.pagenum = 1;
            this.getGoodsList();
        },
        // 添加用户 - 打开对话框
        showAddUserDia() {
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
                        // data
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
                    this.getGoodsList();
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
        showEditUserDia(user) {
            console.log(user);
            this.addForm = user;
            this.dialogFormVisibleEdit = true;
        },
        // 编辑用户,发送请求
        async editUser() {
            this.dialogFormVisibleEdit = false;
            const res = await this.$http.put(`users/${this.addForm.id}`);
            console.log(res);
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data;
            if (status === 200) {
                this.pagenum = 1;
                this.getGoodsList();
                this.$message.success(msg);
            } else {
                this.$message.warning(msg);
            }
        },

        // 分配角色 - 显示对话框
        async showSetUserRoleDia(user) {
            this.dialogFormVisibleRole = true;
            this.currUserName = user.username;
            this.currUserId = user.id;
            const res = await this.$http.get(`users/${user.id}`);
            this.currRoleId = res.data.data.rid;
            const allRoles = await this.$http.get('roles');
            this.roles = allRoles.data.data;
            console.log(allRoles);
        },
        // 修改用户角色
        async setRole(){
            const res = await this.$http.put(`/users/${this.currUserId}/${this.currRoleId}`);
            console.log(res);
            this.dialogFormVisibleRole = false;
            const {meta:{msg,status}} = res.data;
            if (status === 200) {
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
    .inputSearch {
        width: 300px;
        margin-right: 10px;
    }
}
</style>
