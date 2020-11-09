<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        simple
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 标签栏 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeTableave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name + ': '"
              v-for="item in manyTableData"
              :key="item.attr_id"
              label-width="70px"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="val"
                  v-for="(val, i) in item.checked"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
              <!-- <p>{{ item.attr_vals }}</p> -->
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name + ': '"
              v-for="item in onlyTableData"
              :key="item.attr_id"
              label-width="150px"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="val"
                  v-for="(val, i) in item.checked"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 需要自己添加token -->
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="uploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="previewVisiable" width="50%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeIndex: 0,
      addForm: {
        goods_name: '',
        goods_weight: 0,
        goods_price: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '请选择分类', trigger: 'blur' }]
      },
      cateList: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 动态参数
      manyTableData: [],
      //
      onlyTableData: [],
      // 图片上传地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisiable: false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类信息失败')
      }
      this.cateList = res.data
      //   console.log(this.cateList)
    },
    // 级联选择器选中变化事件
    handleChange() {
      //   console.log(this.addForm.goods_cat)
      // 判断是否选中第三级分类，否则清空
      if (this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择三级分类')
        this.addForm.goods_cat = []
      }
    },
    // 切换标签栏事件
    beforeTableave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择分类信息')
        return false
      }
      if (activeName !== '0' && activeName - oldActiveName > 1) {
        return false
      }
    },
    //
    async tabClicked() {
      //   console.log(this.activeIndex)
      // 动态参数面板
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'many' }
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态属性失败')
        }
        // console.log(res.data)
        res.data.forEach(element => {
          element.attr_vals =
            element.attr_vals.length === 0 ? [] : element.attr_vals.split(' ')
          element.checked = element.attr_vals
        })
        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: 'only' }
          }
        )
        if (res.meta.status !== 200) {
          this.$message.error('商品属性获取失败')
        }
        res.data.forEach(element => {
          element.attr_vals =
            element.attr_vals.length === 0 ? [] : element.attr_vals.split(' ')
          element.checked = element.attr_vals
        })
        this.onlyTableData = res.data
        // console.log(this.onlyTableData)
      }
    },
    // 图片预览
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.previewVisiable = true
    },
    // 图片删除
    handleRemove(file) {
      //   console.log(file)
      const filePath = file.response.data.tmp_path
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      this.addForm.pics.splice(i, 1)
      //   console.log(this.addForm.pics)
    },
    // 图片上传成功
    uploadSuccess(response) {
      if (response.meta.status !== 200) {
        this.$message.error('图片上传失败')
      }
      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
      //   console.log(this.addForm.pics)
    },
    add() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的信息')
        }
        // 深拷贝
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        this.manyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newInfo)
        })
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })
        // console.log(this.manyTableData)
        form.attrs = this.addForm.attrs
        // console.log(form)
        // this.$http.post('goods')
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) {
          this.$message.error('商品添加失败')
        }
        this.$message.success('添加商品成功')
        // 跳转到商品页面
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    // 返回三级分类id
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin: 30px 0 20px 20px;
  .el-form-item {
    margin-bottom: 25px;
    .el-input {
      width: 70%;
    }
    .el-checkbox {
      margin: 0 10px 10px 0;
    }
  }
}

.previewImg {
  width: 100%;
}

.el-button {
  margin-top: 20px;
}
</style>
