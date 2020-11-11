<template>
  <div id="app">
    <div>Hello Vuex</div>
    <p>+++++++++++++++++++++++++++++++</p>
    <my-add></my-add>
    <p>-------------------------------</p>
    <my-sub></my-sub>
  </div>
</template>

<script>
// 调用其他组件
import Add from './components/Add'
import Sub from './components/Sub'
export default {
  data() {
    return {}
  },
  components: {
    'my-add': Add,
    'my-sub': Sub
  }
}
</script>

<style lang="less" scoped></style>
