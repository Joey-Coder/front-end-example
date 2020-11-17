<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        icon="search"
        size="small"
        slot="title"
        round
        class="search-btn"
        color="#ecf9f2"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 标签栏 -->
    <van-tabs
      v-model="active"
      class="channel-tabs"
      title-active-color="#007f80"
      color="#007f80"
    >
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        ><article-list :channel="item"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'homeIndex',
  components: {
    ArticleList
  },
  props: {},
  data() {
    return {
      active: 0,
      // 频道列表
      channels: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
      console.log(this.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
    .search-btn {
      width: 277px;
      height: 32px;
      border: none;
      color: #666;
      font-size: 14px;
      // .van-icon-search {
      //   // color: #ffffff;
      // }
      .van-button__text {
        color: #333;
      }
    }
  }
  // .channel-tabs {
  //   /deep/ .van-tab {
  //     border-right: 1px solid #eee;
  //     border-bottom: 1px solid #eee;
  //   }
  //   /deep/ .van-tabs__line {
  //     bottom: 20px;
  //     width: 15px !important;
  //   }
  // }
}
</style>
