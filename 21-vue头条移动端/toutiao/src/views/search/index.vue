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
        @focus="isResultShow = false"
        clearable
        shape="round"
        background="#007f80"
        autofocus
      />
    </form>
    <!-- 搜索结果组件 -->
    <search-result v-if="isResultShow" />
    <!-- 搜索建议组件 -->
    <search-suggestions v-else-if="searchText" :search-text="searchText" />
    <!-- 搜索记录组件 -->
    <search-history v-else />
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
      searchText: '',
      // 是否显示搜索结果
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      this.isResultShow = true
    },
    // 取消搜索
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped></style>
