<template>
  <div class="search-suggestions-container">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
// 引入防抖函数，从loadsh
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestions',
  created() {},
  mounted() {},
  data() {
    return {
      // 联想词
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
    // watch的另一种写法
    searchText: {
      // debounce 防抖函数，在1秒内只发送一次请求
      handler: debounce(async function() {
        // 1.发送请求获取数据
        const { data } = await getSuggestions(this.searchText)
        // console.log(data)
        // 2.数据绑定
        this.suggestions = data.data.options
        // 3.渲染
      }, 1000),
      // 立即监听, 监听第一次变化在内
      immediate: true
    }
  },
  methods: {
    /**
     * prama {String} str 联想词
     */
    highlight(str) {
      // 创建一个正则表达对象
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(
        reg,
        `<span style="color:#007f80">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style lang="less" scoped></style>
