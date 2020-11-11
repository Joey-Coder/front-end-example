<template>
  <div>
    <h3>当前最新的count为：{{ count }}</h3>
    <h3>getters：{{ showNum }}</h3>
    <button @click="add">+1</button>
    <button @click="addN(3)">+3</button>
    <button @click="addAsync">异步+1</button>
    <button @click="addAsyncN(3)">异步+3</button>
  </div>
</template>

<script>
//  通过导入方式使用state

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    // 映射为count
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['add', 'addN', 'sub', 'subN']),
    ...mapActions(['addAsync', 'addAsyncN'])
  }
}
</script>

<style lang="less" scoped></style>
