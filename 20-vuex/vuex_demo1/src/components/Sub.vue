<template>
  <div>
    <!-- 通过this.$state使用state -->
    <h3>当前最新的count为： {{ this.$store.state.count }}</h3>
    <h3>getter： {{ this.$store.getters.showNum }}</h3>
    <button @click="btnHandle">-1</button>
    <button @click="btnHandleN">-3</button>
    <button @click="AsyncHandle">异步-1</button>
    <button @click="AsyncHandleN">异步-3</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    btnHandle() {
      this.$store.commit('sub')
    },
    btnHandleN() {
      this.$store.commit('subN', 3)
    },
    AsyncHandle() {
      this.$store.dispatch('subAsync')
    },
    AsyncHandleN() {
      this.$store.dispatch('subAsyncN', 3)
    }
  }
}
</script>

<style lang="less" scoped></style>
