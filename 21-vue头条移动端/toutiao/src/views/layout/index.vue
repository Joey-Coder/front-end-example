<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" router>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
