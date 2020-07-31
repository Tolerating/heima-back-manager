<template>
  <el-card class="box-card">
    <NavigationPath :pathArray="pathArray" />
    <el-row>
      <el-col :span="24">
        <el-button type="success" @click="addGoodsCate">添加分类</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <!-- 级联选择器 -->
          <el-cascader
            expand-trigger="hover"
            change-on-select
            clearable
            :options="caslist"
            v-model="selectedOptions"
            :props="defaultProp"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table height="450" :data="list" style="width:100%;">


      <!-- 
        treeKey -> nodekey  -> 节点唯一标识
        parentKey -> 父节点的id
        levelKey -> 当前节点的级别
        childKey -> 子节点
       -->
      <el-tree-gird
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
      >

      </el-tree-gird>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted === false">有效</span>
          <span v-else-if="scope.row.cat_deleted === true">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
let ElTreeGird = require('element-tree-grid');
export default {
  name: "goodscategorys",
  data() {
    return {
      pathArray: ["商品管理", "商品分类"], //路径导航数组
      dialogFormVisibleAdd: false,
      // S=级联选择器绑定的数据
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      caslist:[],
      // End
      form: {
        cat_name:"",
        cat_pid:-1,
        cat_level:-1
      },
      list: [],
      // S=分页绑定的数据
      total: -1,
      pagenum: 1,
      pagesize:2,
      // End
    };
  },
  components: {
    NavigationPath,
    ElTreeGird
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    //   添加分类 - 发送请求
    async addCate() {
      if(this.selectedOptions.length === 0){
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      }else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0],
        this.form.cat_level = 1;
      }else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1],
        this.form.cat_level = 2;
      }
      const res = await this.$http.post(`categories`,this.form);
      // console.log(res);

      // 更新视图
      // this.getGoodsCate();

      this.dialogFormVisibleAdd = false;

      this.form = {};
    },
    //   添加分类 - 显示对话框
    async addGoodsCate() {
       const res = await this.$http.get("categories?type=2");
      console.log(res);
      this.caslist = res.data.data.result;
      this.dialogFormVisibleAdd = true;
    },
    //   获取所有商品分类
    async getGoodsCate() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res.data.data);
      this.list = res.data.data.result;
      this.total = res.data.data.total;
    },
    handleChange(){},
  },
};
</script>

<style></style>
