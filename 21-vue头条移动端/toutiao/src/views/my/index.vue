<template>
  <div class="my-container">
    <!-- 已登录界面 -->
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        title="单元格"
        value="内容"
        center
        class="base-info"
        :border="false"
      >
        <van-image
          slot="icon"
          fit="cover"
          class="avatar"
          round
          :src="currentUser.photo"
        ></van-image>
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="edit-btn" to="user/profile">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info" center>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录界面 -->
    <div class="not-login" v-else @click="$router.push('/login')">
      <van-image
        class="not-login-avatar mb-4"
        round
        :src="require('../../assets/logo.png')"
        fit="contain"
      ></van-image>
      <div class="not-login-text">登录/注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item icon="star-o" text="收藏" class="nav-grid-item" />
      <van-grid-item
        icon="browsing-history-o"
        text="历史"
        class="nav-grid-item"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" class="mb-4" />
    <!-- <van-cell title="退出导航"></van-cell> -->
    <van-button block class="logout-btn" v-if="user" @click="onLogout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data() {
    return {
      // 当前用户信息
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadCurrentUser()
  },
  mounted() {},
  methods: {
    // 退出登录操作
    onLogout() {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },
    //
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
      // console.log(data)
      console.log(this.currentUser)
    }
  }
}
</script>

<style lang="less" scoped>
.my-info {
  background-color: #007f80;
  .base-info {
    // 设置盒模型
    box-sizing: border-box;
    height: 115px;
    background-color: unset;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar {
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      border: 1px solid #e5ffff;
      margin-right: 11px;
    }
    .name {
      color: #ffffff;
      font-size: 15px;
    }
    .edit-btn {
      height: 18px;
      font-size: 10px;
      color: #666;
    }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #ffffff;
      .text-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
  }
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
}
.nav-grid {
  .nav-grid-item {
    height: 70px;
    /deep/ .van-icon-star-o {
      font-size: 23px;
      color: #eb5253;
    }
    /deep/ .van-icon-browsing-history-o {
      font-size: 23px;
      color: orange;
    }
    /deep/ .van-grid-item__text {
      font-size: 13px;
      color: #333;
    }
  }
}
.not-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 180px;
  background-color: #007f80;
  .not-login-avatar {
    background-color: #e5ffff;
    width: 80px;
    height: 80px;
    border: 1px #e5ffff solid;
  }
  .not-login-text {
    color: #fff;
    font-size: 14px;
  }
}
.mb-4 {
  margin-bottom: 4px;
}
.logout-btn {
  color: #d86262;
  border: none;
}
</style>
