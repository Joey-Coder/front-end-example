<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <!-- 表格 -->
        <tree-table
          :data="catelist"
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          show-index
          index-text="#"
          border
          class="tree-table"
          :show-row-hover="false"
        >
          <!-- 是否有效 -->
          <template slot="isok" slot-scope="scope">
            <i
              class="el-icon-success"
              style="color: lightgreen"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error" style="color: red" v-else></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag typer="warning" v-else>三级</el-tag>
          </template>
          <!-- 排序 -->
          <template slot="opt">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="primary" circle size="small">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button type="danger" circle size="small">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </tree-table>
      </el-row>
      <el-row>
        <!-- 分页栏 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 5, 8, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加分类弹框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        :rules="addCateFormRules"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类
      catelist: [],
      //
      total: 0,
      // 为tree-table定义列
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // prop: 'cat_deleted',
          // 自定义插槽
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      //
      addCateDialogVisible: false,
      //
      addCateForm: {
        cat_name: '',
        // 父id
        cat_pid: 0,
        //
        cat_level: 0
      },
      //
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      parentCateList: [],
      //
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      //
      selectedKeys: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      //   console.log(res.data)
      this.catelist = res.data.result
      this.total = res.data.total
    },
    //
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    //
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    //
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    //
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类失败')
      }
      //   console.log(res.data)
      this.parentCateList = res.data
    },
    parentCateChange() {
      if (this.selectedKeys.length > 0) {
        //
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
      //   console.log(this.selectedKeys)
    },
    //
    async addCate() {
      //   console.log(this.addCateForm)
      const { data: res } = await this.$http.post(
        'categories',
        this.addCateForm
      )
      if (res.meta.status !== 201) {
        return this.$message.error('添加分类失败')
      }
      this.$message.success('添加分类成功')
      this.getCateList()
      this.addCateDialogVisible = false
    },
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.tree-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}

.el-cascader {
  width: 100%;
}
</style>
