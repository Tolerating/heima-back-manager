<template>
  <el-card>
    <!-- 1.面包屑 -->
    <NavigationPath :pathArray="pathArray" />

    <!-- 2.提示 el-alert -->
    <el-alert
      title="添加商品信息"
      type="success"
      :closable="false"
      center
      show-icon
    ></el-alert>

    <!-- 3.步骤条 el-steps -->
    <el-steps
      :active="active | number"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:400px;overflow:auto;"
    >
      <el-tabs v-model="active" tab-position="left" @tab-click="tabChange">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              clearable
              :options="options"
              v-model="selectedOptions"
              :props="defaultProp"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item
            v-for="(item, index) in arrDyparams"
            :key="index"
            :label="item.attr_name"
          >
            <el-checkbox-group v-model="checkList[index]">
              <el-checkbox border v-for="(item1,index1) in item.attr_vals" :key="index1" :label="item1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
            <el-form-item
            v-for="(item, index) in arrStaticparams"
            :key="index"
            :label="item.attr_name"
          >
          <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
export default {
  name: "goodsadd",
  data() {
    return {
      pathArray: ["商品管理", "商品列表"], //路径导航数组
      active: "1",
      // 添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "", // 以','分隔的分类列表,不能为空
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "", //上传图片的临时路径,可以为空
        attrs: "", //商品的参数(数组)
      },
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
      checkList:[],
    // 静态参数的数据数组
    arrStaticparams:[]
    };
  },
  components: {
    NavigationPath,
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    // 级联选择器 @change触发的方法
    handleChange() {},
    // 获取三级分类的信息
    async getGoodCate() {
      const res = await this.$http.get("categories?type=3");
      console.log(res);
      this.options = res.data.data;
    },
    // 点击不同的tab时
    async tabChange() {
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          this.$nextTick(() => {
            this.active = "1";
          });
          this.$message.warning("请选择商品的三级分类");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        this.arrDyparams = res.data.data;
        this.arrDyparams.forEach((item)=>{
            item.attr_vals.length?item.attr_vals = item.attr_vals.trim().split(','):[];
            this.checkList.push(item.attr_vals);
        });
      }else if (this.active === '3') {
          if (this.selectedOptions.length !== 3) {
          this.$nextTick(() => {
            this.active = "1";
          });
          this.$message.warning("请选择商品的三级分类");
          return;
        }
         const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        this.arrStaticparams = res.data.data;
      }
    },
  },
};
</script>

<style></style>
