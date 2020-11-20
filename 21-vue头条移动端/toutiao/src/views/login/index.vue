<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      :validate-first="true"
      ref="loginFormRef"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        class="toutiao-yanzhengma-icon"
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template #button>
          <van-button
            v-if="isCountDownShow === false"
            size="small"
            type="primary"
            round
            native-type="button"
            :loading="isSendSmsLoading"
            loading-text="获取验证码中"
            @click="onSendSms"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="primary" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'onBlur' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请填写格式正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onBlur' },
          {
            pattern: /^\d{6}$/,
            message: '请填写格式正确的验证码',
            trigger: 'onBlur'
          }
        ]
      },
      //
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      // 登录提示
      this.$toast.loading({
        message: '登录中...',
        // 当登录中时，其他按钮禁止点击
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(this.user)
        console.log(res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('登录失败,手机号或者验证码错误')
      }
    },
    // 自定义验证规则输出
    onFailed(error) {
      console.log('验证失败：', error)
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: 'top' })
      }
    },
    // 发送验证码事件
    async onSendSms() {
      // console.log('onSendSms')
      try {
        // 校验手机号
        await this.$refs.loginFormRef.validate('mobile')
        this.isSendSmsLoading = true
        // 发送验证码请求
        await sendSms(this.user.mobile)
        // 倒计时
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '短信发送太频繁了，请稍后再试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '未知错误'
          console.log('未知错误：', err)
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 16px 26px;
    border: none;
    .van-button__text {
      font-size: 15px;
    }
  }
  // /deep/ 可以渗透到子组件中修改样式
  // 没有带data-v-xxxx的样式标签都要带
  /deep/ .toutiao-yanzhengma::before {
    display: block;
    margin-top: 4px;
  }
  .van-button {
    background-color: #009999;
    border: none;
  }
}
</style>
