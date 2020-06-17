<template>
  <el-card>
    <!-- 面包屑 -->
    <NavigationPath :pathArray="pathArray" />
    <el-row class="addrolebtn">
      <el-col>
        <el-button @click="showAddRoleDia">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item, index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag
                @close="deleteRight(scope.row, item.id)"
                closable
                type="success"
                >{{ item.authName }}</el-tag
              >
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1, index1) in item.children" :key="index1">
                <el-col :span="4">
                  <el-tag
                    @close="deleteRight(scope.row, item1.id)"
                    closable
                    type="info"
                    >{{ item1.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleteRight(scope.row, item2.id)"
                    closable
                    type="warning"
                    v-for="(item2, index2) in item1.children"
                    :key="index2"
                  >
                    {{ item2.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 无权限的提示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="100"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="150">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditRoleDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRole(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetRIghtRoleDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <el-tree
      ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight">确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
      <el-form ref="roleAddForm" :rules="rules" :model="form">
            <el-form-item label="角色名称" label-width="100px" prop="roleName">
                <el-input v-model="form.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
                <el-input v-model="form.roleDesc" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 编辑角色的对话框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleEdit">
      <el-form ref="roleEditForm" :rules="rules" :model="form">
          <el-form-item label="角色ID" label-width="100px">
                {{form.id}}
            </el-form-item>
            <el-form-item label="角色名称" label-width="100px" prop="roleName">
                <el-input v-model="form.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
                <el-input v-model="form.roleDesc" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
export default {
  name: "role",
  data() {
    return {
      pathArray: ["权限管理", "角色列表"],
      rolelist: [],
      dialogFormVisibleRight: false,
      dialogFormVisibleAdd:false,
      dialogFormVisibleEdit:false,
      //树形结构的数据
      treelist: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrcheck: [],
      currRoleId:-1,
      form:{
          id:"",
          roleName:"",
          roleDesc:""
      },
      rules: {
                roleName: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }]
            },
    };
  },
  created() {
    this.getRoleList();
  },
  components: {
    NavigationPath,
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      this.rolelist = res.data.data;
    },
    // 取消角色权限
    async deleteRight(role, rightId) {
      //roleId:角色id,  rightId:权限id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
    //   console.log(res);
      const {
        meta: { msg, status },
        data,
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        role.children = data;
      } else {
        this.$message.warning(msg);
      }
    },
    // 修改/分配 权限 -- 打开对话框
    async showSetRIghtRoleDia(role) {
      const res = await this.$http.get(`rights/tree`);
      //   console.log(res);
      this.treelist = res.data.data;
      this.dialogFormVisibleRight = true;
      this.currRoleId = role.id;
      let result = [];
      role.children.forEach((item) => {
        item.children.forEach((item1) => {
        //   console.log(item1);
          if (item1.children) {
            item1.children.forEach((item2) => {
              result.push(item2.id);
            });
          } else {
            result.push(item1.id);
          }
        });
      });
      this.arrcheck = result;
    },
    // 修改/分配 权限
    async setRoleRight(){
        let arr1 = this.$refs.tree.getCheckedKeys();
        // console.log("选中",arr1);
        let arr2 = this.$refs.tree.getHalfCheckedKeys();
        // console.log("半选",arr2);
        let arr = [...arr1,...arr2];
        // console.log(arr);
        const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{
            rids:arr.join(',')
        });
        const {meta:{msg,status}} = res.data;
        if (status === 200) {
            this.$message.success(msg);
        }else{
            this.$message.warning(msg);
        }
        this.getRoleList();
        this.dialogFormVisibleRight = false;
    },
    // 添加角色 - 打开对话框
    showAddRoleDia(){
        this.dialogFormVisibleEdit = true;
        this.form = {};
    },
    // 添加角色
    addRole(){
        this.$refs["roleAddForm"].validate(async (vaild)=>{
            if(vaild){
                const res = await this.$http.post(`roles`,this.form);
                console.log(res);
                const {meta:{msg,status}} = res.data;
                if (status === 200) {
                    this.$message.success(msg);
                }else{
                    this.$message.warning(msg);
                }
                this.dialogFormVisibleAdd = false;
                this.getRoleList();
            }
        });
    },
    // 删除角色
    deleteRole(role){
        this.$confirm('删除角色?, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`roles/${role.id}`);
                // console.log(res);
                if (res.data.meta.status === 200) {
                    this.pagenum = 1;
                    this.getRoleList();
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
    // 编辑角色 - 打开对话框
    showEditRoleDia(role){
        this.dialogFormVisibleEdit = true;
        this.form = {...role};
        delete this.form.children;
        this.currRoleId = role.id;
    },
    // 编辑角色
    editRole(){
        this.$refs["roleEditForm"].validate(async (vaild)=>{
            if(vaild){
                const res = await this.$http.put(`roles/${this.currRoleId}`,this.form);
                console.log(res);
                const {meta:{msg,status}} = res.data;
                if (status === 200) {
                    this.$message.success(msg);
                }else{
                    this.$message.warning(msg);
                }
                this.dialogFormVisibleEdit = false;
                this.getRoleList();
            }
        });
    }
  },
};
</script>

<style lang="scss"></style>
