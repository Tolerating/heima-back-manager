<template>
  <el-card>
    <NavigationPath :pathArray="pathArray" />
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader
            expand-trigger="hover"
            clearable
            :options="catlitst"
            v-model="selectedOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table height="450" :data="list" style="width:100%;">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="100"
      ></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === '0'">已付款</el-tag>
          <el-tag v-if="scope.row.order_pay === '1'" type="danger"
            >未付款</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="是否有效" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted === 'false'">有效</span>
          <span v-else-if="scope.row.cat_deleted === 'true'">无效</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否发货"
        prop="is_send"
        width="100"
      ></el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmdate }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditdia"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import NavigationPath from "@/components/navigationPath";
import areaList from "@/assets/area.js";
export default {
  name: "goodscategorys",
  data() {
    return {
      pathArray: ["订单管理", "订单列表"], //路径导航数组
      dialogFormVisible: false,
      // S=级联选择器绑定的数据
      selectedOptions: [],
      catlitst: [],
      // End
      form: {
        address: "",
      },
      list: [],
    };
  },
  components: {
    NavigationPath,
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`order?pagenum=1&pagesize=10`);
      this.list = res.data.data.goods;
    },
    showEditdia() {
      this.catlitst = areaList;
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style></style>
