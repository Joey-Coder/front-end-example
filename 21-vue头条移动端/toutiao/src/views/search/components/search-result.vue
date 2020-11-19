<template>
  <div class="search-result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/search'
export default {
  name: 'SearchResult',
  created() {},
  mounted() {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  methods: {
    // 搜索结果加载
    async onLoad() {
      // 1.请求获取数据
      const { data } = await getResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      const { results } = data.data
      // console.log(results)
      // 2.数据绑定
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断是否关闭finished
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
