<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- keep-alive代表组件缓存 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      value: 50
    }
  },
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
.box {
  width: 200px;
  height: 100px;
  background-color: #ecf9f2;
}
</style>
