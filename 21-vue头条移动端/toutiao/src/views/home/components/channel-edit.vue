<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        slot="right-icon"
        type="danger"
        plain
        round
        size="mini"
        @click="editChannels"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :class="active === index ? 'highlight' : ''"
        v-for="(value, index) in userChannels"
        :key="value.id"
        :text="value.name"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        @click="onUserChannelClick(index)"
      ></van-grid-item>
    </van-grid>
    <van-cell center :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in recommendChannels"
        :key="value.id"
        :text="value.name"
        @click="onAddChannel(value)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  watch: {},
  computed: {
    // 计算推荐频道
    // 会更根据allChannels的变动而变动
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(item => {
          return item.id === channel.id
        })
      })
    }
  },
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAddChannel(channel) {
      // 添加到我的频道中
      this.userChannels.push(channel)
      //   console.log(channel)
      // todo 持久化
    },
    // 编辑频道
    editChannels() {
      // 展示x图标
      this.isEdit = !this.isEdit
    },
    // 点击我的频道按钮
    onUserChannelClick(index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态呢
        this.deleteChannel(index)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    // 删除频道
    deleteChannel(index) {
      // 删除active之前的标签需要更新索引
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
    },
    // 切换频道
    switchChannel(index) {
      //   console.log('切换频道')
      // 子组件向父组件传递数据，通过触发和监听
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333333;
  }
  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      padding: 0;
      .van-icon-close {
        color: #bbb;
        position: absolute;
        font-size: 20px;
        top: -5px;
        right: -5px;
      }
      .van-grid-item__text {
        margin: 0;
        font-size: 14px;
        color: #222;
      }
    }
  }
}
.highlight {
  /deep/ .van-grid-item__text {
    color: #007f80 !important;
  }
}
</style>
