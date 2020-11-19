<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
        clearable
        shape="round"
        background="#007f80"
        autofocus
      />
    </form>
    <!-- 搜索结果组件 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 搜索建议组件 -->
    <search-suggestions
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 搜索记录组件 -->
    <search-history
      v-else
      :histories="histories"
      @search="onSearch"
      @delete-all-histories="histories = $event"
    />
  </div>
</template>

<script>
import SearchSuggestions from './components/search-suggestions'
import SearchResult from './components/search-result'
import SearchHistory from './components/search-history'
import { getHistories } from '@/api/search'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
// import { uniq } from 'lodash'
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
      isResultShow: false,
      // 历史记录
      histories: getItem('search-histories') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    histories() {
      // 监听历史数据，一旦发送变化就存储到本地
      setItem('search-histories', this.histories)
    }
  },
  created() {
    // this.loadHistories()
  },
  mounted() {},
  methods: {
    onSearch(searchText) {
      this.searchText = searchText

      // 去除相同的历史记录
      const index = this.histories.indexOf(searchText)
      if (index !== -1) {
        this.histories.splice(index, 1)
      }
      // 记录搜索历史, 置顶
      this.histories.unshift(searchText)
      // 历史记录存储到本地
      // setItem('search-histories', this.histories)

      this.isResultShow = true
    },
    // 取消搜索
    onCancel() {
      this.$router.back()
    },
    // 合并服务器的历史记录和本地的历史记录
    async loadHistories() {
      // console.log('sfssfsfds')
      let localHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getHistories()
        localHistories = [...localHistories, ...data.data.keywords]
        console.log(data.data.keywords)
      }
      // console.log(localHistories)
      // ES6 利用Set进行数组去重
      this.histories = [...new Set([...localHistories])]
      // console.log(this.histories)
    }
  }
}
</script>

<style lang="less" scoped></style>
