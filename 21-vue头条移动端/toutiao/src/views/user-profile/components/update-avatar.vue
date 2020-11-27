<template>
  <div class="update-avatar">
    <img :src="image" alt="" accept="image/*" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { updateAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdateAvatar',
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  methods: {
    // 确定修改图片, 向后端发送修改请求
    async onConfirm() {
      const t = this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 3000
      })
      //   console.log('onConfirm')
      // 需要使用FormData类型上传
      const avatarFile = await this.getCropperCanvas()
      //   console.log(avatarFile)
      const imageFile = new FormData()
      imageFile.append('photo', avatarFile)
      // 发送请求
      const { data } = await updateAvatar(imageFile)
      t.clear()
      //   console.log(data)
      this.$toast(`修改${data.message === 'OK' ? '成功' : '失败'}`)
      // 更新父组件图片
      this.$emit('close')
      this.$emit('update-avatar', window.URL.createObjectURL(avatarFile))
    },
    // 获取裁切图片实例
    getCropperCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    }
  },
  props: {
    file: {
      required: true
    }
  },
  created() {},
  components: {},
  mounted() {
    const image = this.$refs.image
    // 新建裁切器实例
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      // 裁切框是否可移动
      cropBoxMovable: true,
      // 裁切框是否可支持缩放
      cropBoxResizable: true,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.update-avatar {
  .van-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  img {
    display: block;
    max-width: 100%;
  }
}
</style>
