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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round @click="addDialogVisible = true"
            >添加用户</el-button
          >
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
              @change="userStateChanged(scope.row)"
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
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeUserById(scope.row.id)"
              >
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

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 4, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="addForm.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="addForm.password"
              :show-password="true"
              prefix-icon="el-icon-key"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="addForm.email"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="addForm.mobile"
              prefix-icon="el-icon-mobile-phone"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="adduser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="editFormRules"
          label-width="80px"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义邮箱检验规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      if (regEmail.test(value)) {
        // 合法
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    // 自定义手机号码检验规则
    var checkMobile = (rule, value, cb) => {
      const regEmail = /^1[3456789]\d{9}$/
      if (regEmail.test(value)) {
        // 合法
        return cb()
      }
      cb(new Error('请输入合法手机号码'))
    }
    return {
      // 列表请求参数
      queryInfo: {
        query: '',
        // 第几页
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 2
      },
      userlist: [],
      total: 0,
      // 添加用户对话框
      addDialogVisible: false,
      // 添加用户表单
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      // 添加用户表单规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 4,
            max: 10,
            message: '用户名在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码在6到10个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      //
      editDialogVisible: false,
      //
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      //   console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },

    // 每页展示条数发生改变
    handleSizeChange(newSize) {
      // 1. 修改每条页码参数
      // 2. 重新发送列表数据请求
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 当前页码发生跳转
    handleCurrentChange(currentNum) {
      this.queryInfo.pagenum = currentNum
      this.getUserList()
    },
    // 修改状态按钮事件
    async userStateChanged(userInfo) {
      //   console.log(userInfo)
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      //   console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败!')
      }
      this.$message.success('更新用户状态成功')
    },
    // 关闭对话框，重置表单事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 预校验
    adduser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 预校验通过，发起添加用户请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败!')
        }
        this.$message.success('添加用户成功！')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取该用户信息失败')
      }
      this.editForm = res.data
      console.log(this.editForm)
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 校验通过
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户失败')
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('修改用户成功')
      })
    },
    async removeUserById(id) {
      console.log(id)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      //   console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功')
      this.getUserList()
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
.el-pagination {
  margin-top: 20px;
}
</style>
