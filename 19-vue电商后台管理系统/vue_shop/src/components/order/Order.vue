<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单" prop="order_number"></el-table-column>
        <el-table-column
          label="价格"
          prop="order_price"
          width="120px"
        ></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="120px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '1'" type="success">
              已付款</el-tag
            >
            <el-tag v-else type="warning">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" width="120px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_send === '1'" type="success"
              >已发货</el-tag
            >
            <el-tag v-else type="wawrning">未发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showBox"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="物流信息"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-location"
                circle
                @click="showProgressBox"
              ></el-button>
            </el-tooltip>
            {{ scope.x }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="orderList.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="orderList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
    >
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        :rules="addressFormRules"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="addressForm.address1"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogClosed">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 展示物流进度 -->
    <el-dialog
      title="物流进度"
      :visible.sync="progressDialogVisible"
      width="50%"
    >
      <el-timeline reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
          color="#0bbd87"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="progressDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata.js'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      progressDialogVisible: false,
      progressInfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        this.$message.error('获取订单列表失败')
      }
      //   console.log(res.data)
      this.total = res.data.total
      this.orderList = res.data.goods
      //   console.log(this.total)
      //   console.log(this.orderList)
    },
    // 页面条数发生改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 当前页面跳转事件
    handleCurrentChange(newNum) {
      this.queryInfo.pagenum = newNum
      this.getOrderList()
    },
    //
    showBox() {
      this.addressDialogVisible = true
    },
    //
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
      this.addressDialogVisible = false
    },
    //
    async showProgressBox() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        this.$message.error('获取物流信息失败')
      }
      this.progressInfo = res.data
      this.progressDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.el-cascader {
  width: 100%;
}
.el-timeline {
  max-height: 600px;
  overflow: scroll;
}
</style>
