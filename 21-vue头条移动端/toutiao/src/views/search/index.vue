<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        clearable
      />
    </form>
    <!-- 搜索结果 -->
    <search-result />
    <!-- 搜索建议 -->
    <search-suggestions />
    <!-- 搜索记录 -->
    <search-history />
  </div>
</template>

<script>
import SearchSuggestions from './components/search-suggestions'
import SearchResult from './components/search-result'
import SearchHistory from './components/search-history'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestions,
    SearchResult,
    SearchHistory
  },
  props: {},
  data() {
    return {
      // 关键词
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      console.log('Searching...')
    },
    // 取消搜索
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped></style>
