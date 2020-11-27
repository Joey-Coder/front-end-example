<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'UpdateBirthday',
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      //   console.log('onConfirm')
      const t = this.$toast.loading({
        message: '修改中',
        duration: 3000,
        forbidClick: true
      })
      const d = dayjs(this.currentDate).format('YYYY-MM-DD')
      //   console.log(d)
      try {
        await updateUserInfo({
          birthday: d
        })
        this.$emit('input', d)
        t.clear()
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('用户名已存在')
        } else if (error && error.response && error.response.status === 401) {
          this.$toast.fail('登录过期，请重新登录')
        } else {
          this.$toast.fail('操作失败')
        }
      }
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  created() {}
}
</script>

<style lang="less" scoped></style>
