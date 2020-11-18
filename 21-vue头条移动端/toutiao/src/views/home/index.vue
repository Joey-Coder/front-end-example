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
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div
        class="wap-nav-wrap"
        slot="nav-right"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" class="wap-nav" />
      </div>
    </van-tabs>
    <!-- 编辑标签的弹出框 -->
    <van-popup
      v-model="isChannelEditShow"
      round
      position="bottom"
      class="channel-edit-popup"
      closeable
      get-container="body"
    >
      <!-- $event表示事件参数 -->
      <channel-edit
        :user-channels="channels"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
        :active="active"
      />
      <!-- 弹出标签栏组件 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
// import
export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: 0,
      // 频道列表
      channels: [],
      // 标签弹出层
      isChannelEditShow: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      // console.log('get from webserve')
      if (!this.user && getItem('user-channels')) {
        this.channels = getItem('user-channels')
      } else {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      }
    }
    // onUpdateActive(index) {
    //   // console.log(index)
    //   this.active = index
    // }
  }
}
</script>

<style lang="less" scoped>
.channel-edit-popup {
  height: 90%;
}
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
  .wap-nav-placeholder {
    flex-shrink: 0;
    width: 33px;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    background-color: #ffffff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      font-size: 24px;
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
