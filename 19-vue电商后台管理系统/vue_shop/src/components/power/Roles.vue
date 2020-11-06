<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-button type="primary" @click="addRoleDialogVisible = true"
          >添加角色</el-button
        >
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- expand代表收起框 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-start"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editRoleName(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="showDeleteRoleDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
                @click="showSetRightDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色名称对话框 -->
    <el-dialog
      ref="editRoleRef"
      title="修改角色名称"
      :visible.sync="editRoleNamedialogVisible"
      width="50%"
    >
      <el-form ref="form" :model="editRoleNameForm" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleNameForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleNameForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleNamedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendEditRoleNameForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除角色对话框 -->
    <el-dialog title="提示" :visible.sync="deleteRoleDialogVisible" width="50%">
      <span>是否删除该角色</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->

    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="50%"
    >
      <el-form ref="addRoleRef" :model="editRoleNameForm" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleNameForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleNameForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      roleList: [],
      //
      setRightDialogVisible: false,
      //
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中节点
      defKeys: [],
      //
      roleId: '',
      //
      editRoleNamedialogVisible: false,
      //
      editRoleNameForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleNameId: '',
      //
      deleteRoleDialogVisible: false,
      //
      deleteRoleId: '',
      //
      addRoleDialogVisible: false
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.roleList = res.data
      console.log(this.roleList)
    },
    // 删除权限标签
    async removeRightById(role, rightId) {
      //
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('删除已取消')
      }
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      //   this.getRolesList()
      role.children = res.data
    },
    // 分配权限对话框
    async showSetRightDialog(role) {
      // 保存当前打开对话框角色的id
      this.roleId = role.id
      const { data: res } = await this.$http.get('/rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }
      this.rightsList = res.data
      //
      this.getLeafKeys(role, this.defKeys)

      this.setRightDialogVisible = true
    },
    // 通过递归获取三级权限id
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(element => {
        this.getLeafKeys(element, arr)
      })
    },
    // 监听权限配对话框关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 为角色分配权限
    async allotRights() {
      //
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      //
      const idStr = keys.join(',')

      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.getRolesList()
      this.setRightDialogVisible = false
    },
    // 修改角色名称
    editRoleName(role) {
      console.log(role)
      this.editRoleNameForm.roleName = role.roleName
      this.editRoleNameForm.roleDesc = role.roleDesc
      this.editRoleNameId = role.id
      this.editRoleNamedialogVisible = true
    },
    // 发送修改用户名表格
    async sendEditRoleNameForm() {
      const { data: res } = await this.$http.put(
        `/roles/${this.editRoleNameId}`,
        this.editRoleNameForm
      )
      this.$refs.editRoleRef.resetFields()
      if (res.meta.status !== 200) {
        return this.$message.error('修改角色信息失败')
      }
      this.$message.success('修改角色信息成功')
      this.getRolesList()
      this.editRoleNamedialogVisible = false
    },
    //
    showDeleteRoleDialog(id) {
      this.deleteRoleId = id
      this.deleteRoleDialogVisible = true
    },
    async deleteRole() {
      const { data: res } = await this.$http.delete(
        `roles/${this.deleteRoleId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.$message.success('删除角色成功')
      this.getRolesList()
      this.deleteRoleDialogVisible = false
    },
    async addRole() {
      const { data: res } = await this.$http.post(
        'roles',
        this.editRoleNameForm
      )
      this.$refs.addRoleRef.resetFields()
      if (res.meta.status !== 201) {
        return this.$message.error('添加用户失败')
      }
      this.$message.success('添加用户成功')
      this.getRolesList()
      this.addRoleDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}
.el-button {
  margin-right: 10px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.el-tag {
  margin: 10px;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
