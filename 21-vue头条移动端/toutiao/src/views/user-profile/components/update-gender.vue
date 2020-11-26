<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="this.localGenderIndex"
    />
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'UpdateGender',
  data() {
    return {
      localGenderIndex: this.value,
      columns: ['女', '男']
    }
  },
  methods: {
    async onConfirm(value, index) {
      console.log(value, index)
      const t = this.$toast.loading({
        message: '修改中',
        duration: 3000,
        forbidClick: true
      })
      try {
        const { data } = await updateUserInfo({
          gender: index
        })
        console.log(data)
        this.$emit('input', index)
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
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  components: {},
  created() {}
}
</script>

<style lang="less" scoped></style>
