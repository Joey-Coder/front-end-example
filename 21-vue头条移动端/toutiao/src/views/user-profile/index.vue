<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        width="30"
        height="30"
        round
        :src="user.photo"
        fit="cover"
      ></van-image>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    />
    <van-cell title="生日" is-link :value="user.birthday" />

    <!-- 昵称修改弹出框 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name v-model="user.name" @close="isUpdateNameShow = false" />
    </van-popup>
    <!-- 修改性别弹出框 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data() {
    return {
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      user: {}
    }
  },
  props: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data } = await getUserProfile()
      //   console.log(data)
      this.user = data.data
    }
  },
  components: {
    UpdateName,
    UpdateGender
  },
  created() {
    this.getUserInfo()
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.user-profile {
  .van-popup {
    background-color: #ecf9f2;
  }
}
</style>
