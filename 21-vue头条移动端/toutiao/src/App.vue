<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      value: 50
    }
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
