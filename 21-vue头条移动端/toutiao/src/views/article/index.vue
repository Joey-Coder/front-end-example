<template>
  <div class="article-container">
    <!-- app导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- article title -->
    <h1 class="title">{{ article.title }}</h1>
    <!-- about author -->
    <van-cell center class="user-info">
      <!-- author name -->
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <!-- avatar -->
      <van-image
        slot="icon"
        :src="article.aut_photo"
        round
        fit="cover"
        class="avatar"
      ></van-image>
      <!-- pubdate -->
      <div slot="label" class="pubdate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        slot="right-icon"
        round
        size="small"
        :type="article.is_followed ? 'default' : 'info'"
        class="follow-btn"
        :icon="article.is_followed ? '' : 'plus'"
        >{{ article.is_followed ? '已关注' : '未关注' }}</van-button
      >
    </van-cell>
    <!-- article content -->
    <div class="markdown-body" v-html="article.content"></div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data() {
    return {
      article: {}
    }
  },
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    // 获取文章内容
    async loadArticle() {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data
    }
  },

  created() {
    this.loadArticle()
  },
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less">
.article-container {
  .title {
    font-size: 20px;
    color: #333;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
    /deep/ .van-cell__label {
      margin-top: 0;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
