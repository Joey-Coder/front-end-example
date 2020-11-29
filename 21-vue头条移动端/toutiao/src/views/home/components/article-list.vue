<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="item in articles"
          :key="item.aut_id"
          :title="item.title"
        /> -->
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
import '@/utils/dayjs'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      //
      isPullDownLoading: false,
      //
      refreshSuccessText: '',
      // 距离列表滚动距离
      scrollTop: 0
    }
  },
  mounted() {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  // 缓存的组件被调用
  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
  },

  methods: {
    // 加载标签栏
    async onLoad() {
      //   console.log('onLoad')
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   console.log(data)
      const { results } = data.data
      this.articles.push(...results)
      //   console.log(this.articles)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        // 使用最新的时间戳
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      // 数据追加到数组顶部
      this.articles.unshift(...results)
      // 提示刷新数据条数
      this.refreshSuccessText = `更新了${results.length}条数据`
      this.isPullDownLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
