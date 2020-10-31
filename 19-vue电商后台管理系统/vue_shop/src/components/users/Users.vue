<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索与添加 -->
      <!-- gutter为列之间的间隙 -->
      <!-- row总份数为24 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表表格 -->
      <el-table :data="userlist" border style="width: 100%" stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" circle>
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="设置"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="info" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
            {{ scope.row.mg_state.xx }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 20px;
}
.el-switch {
  margin-left: 10px;
}
</style>
