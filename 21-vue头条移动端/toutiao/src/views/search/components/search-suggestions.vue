<template>
  <div class="search-suggestions-container">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      icon="search"
      :title="item"
    ></van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestions',
  created() {},
  mounted() {},
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  watch: {
    // 监听searchText，用来发送请求
    // searchText() {
    //   console.log(123)
    // }
    // watch的另一种写法
    searchText: {
      async handler() {
        // 1.发送请求获取数据
        const { data } = await getSuggestions(this.searchText)
        console.log(data)
        // 2.数据绑定
        this.suggestions = data.data.options
        // 3.渲染
      },
      // 立即监听, 监听第一次变化在内
      immediate: true
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
