<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'UpdateName',
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm() {
      const t = this.$toast.loading({
        message: '修改中',
        duration: 3000,
        forbidClick: true
      })
      try {
        const { data } = await updateUserInfo({
          name: this.localName
        })
        console.log(data)
        this.$emit('input', this.localName)
        t.clear()
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('用户名已存在')
        } else if (error && error.response && error.response.status === 401) {
          this.$toast.fail('登录过期，请重新登录')
        }
      }
    }
  },
  created() {},
  mounted() {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.update-name {
  .field-wrap {
    padding: 10px;
  }
}
</style>
