<template>
  <van-cell class="article-item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img"></van-image>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  data() {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
  }
  .cover-wrap {
    display: flex;
    flex-wrap: nowrap;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      //   &代表父节点
      &:not(:last-child) {
        padding-right: 4px;
      }
      .van-image {
        width: 100%;
        height: 73px;
      }
    }
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    & span {
      margin-right: 12px;
    }
  }
}
</style>
