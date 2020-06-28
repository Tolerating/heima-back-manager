<template>
  <el-card class="box-card">
    <NavigationPath :pathArray="pathArray" />
    <el-alert title="只允许第三级分类设置参数" type="error"></el-alert>

    <el-form
      label-position="left"
      label-width="80px"
      style="margin-top:20px;"
      ref="ruleForm"
    >
      <el-form-item label="商品分类">
        <!-- 级联选择器 -->
        <el-cascader
          expand-trigger="hover"
          :show-all-levels="false"
          clearable
          :options="options"
          v-model="selectedOptions"
          :props="defaultProp"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-button type="danger">设置动态参数</el-button>
        <el-table :data="arrDyparams">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row, tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name">
            <template></template>
          </el-table-column>
          <el-table-column label="操作">
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
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
export default {
  name: "users",
  data() {
    return {
      pathArray: ["商品管理", "商品分类"], //路径导航数组
      activeName: "1",
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数的数据数组
      arrDyparams: [],
      // 动态参数的多选数据绑定数组
      // checkList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  components: {
    NavigationPath,
  },
  watch: {
    selectedOptions: function(val) {
      console.log("jilian", val);
      if (val.length === 0) {
        this.arrDyparams = [];
      }
    },
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    async getGoodCate() {
      const res = await this.$http.get("categories?type=3");
      this.options = res.data.data;
    },
    // 级联选择器 @change触发的方法
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        // 获取动态参数
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        console.log(this.arrDyparams);
        this.arrDyparams.forEach((item) => {
          item.attr_vals.length
            ? (item.attr_vals = item.attr_vals.trim().split(","))
            : [];
          //   this.checkList.push(item.attr_vals);
        });
      }
    },
    // 点击选项卡
    handleClick() {},
    // el-tag的关闭按钮
    async handleClose(categories, tag) {
      categories.attr_vals.splice(categories.attr_vals.indexOf(tag), 1);
      let putData = {
        attr_name: categories.attr_name,
        attr_sel: "many",
        attr_vals: categories.attr_vals.join(","),
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${categories.attr_id}`,
        putData
      );
      const {
        meta: { status, msg },
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
      console.log(res);
    },
    // 点击newTag按钮
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 回车键 or 失去焦点
    async handleInputConfirm(categories) {
      let inputValue = this.inputValue;
      if (inputValue) {
        categories.attr_vals.push(inputValue);
        let putData = {
          attr_name: categories.attr_name,
          attr_sel: "many",
          attr_vals: categories.attr_vals.join(","),
        };
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${categories.attr_id}`,
          putData
        );
        const {
          meta: { status, msg },
        } = res.data;
        if (status === 200) {
          this.$message.success(msg);
        } else {
          this.$message.warning(msg);
        }
        console.log(res);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="scss">
.box-card {
  height: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
