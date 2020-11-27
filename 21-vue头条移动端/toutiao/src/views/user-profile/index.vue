<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <!-- 上传文件的input标签，默认隐藏 -->
    <input type="file" hidden ref="fileRef" @change="onConfirmImg" />
    <van-cell title="头像" is-link @click="$refs.fileRef.click()">
      <van-image
        width="30"
        height="30"
        round
        :src="user.photo"
        fit="cover"
      ></van-image>
    </van-cell>
    <!-- 显示昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isUpdateNameShow = true"
    />
    <!-- 显示性别 -->
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
    />
    <!-- 显示生日 -->
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 昵称修改弹出框 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!-- 修改性别弹出框 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- 修改生日弹出框 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- 修改头像弹出框 -->
    <van-popup
      v-model="isUpdateAvatarShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        v-if="isUpdateAvatarShow"
        :file="imagePreview"
        @close="isUpdateAvatarShow = false"
        @update-avatar="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './components/update-name'
import UpdateBirthday from './components/update-birthday'
import UpdateGender from './components/update-gender'
import UpdateAvatar from './components/update-avatar'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data() {
    return {
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdateAvatarShow: false,
      user: {},
      imagePreview: null
    }
  },
  props: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data } = await getUserProfile()
      //   console.log(data)
      this.user = data.data
    },
    onConfirmImg() {
      console.log(this.$refs.fileRef.files[0])
      //   console.log(this.$refs.fileRef.value)
      // 清除已选图片的文件，以免选定两次选择同一张图片不生效
      this.isUpdateAvatarShow = true
      this.imagePreview = this.$refs.fileRef.files[0]
      this.$refs.fileRef.value = ''
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
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
