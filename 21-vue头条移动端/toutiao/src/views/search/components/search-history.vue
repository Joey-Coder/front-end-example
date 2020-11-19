<template>
  <div class="search-history-container">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('delete-all-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        name="delete"
        size="16px"
        v-else
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(h, index) in histories"
      :key="index"
      :title="h"
      @click="onDelete(h, index)"
    >
      <van-icon name="close" size="16px" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  created() {},
  mounted() {},
  data() {
    return {
      isDeleteShow: false
    }
  },
  props: {
    histories: {
      type: Array,
      required: true
    }
  },
  computed: {},
  methods: {
    onDelete(h, index) {
      if (this.isDeleteShow) {
        // 编辑状态触发删除
        this.histories.splice(index, 1)
        // 更新本地历史记录
        setItem('search-histories', this.histories)
        // 更新服务器历史记录 todo
      } else {
        // 非编辑状态触发搜索
        this.$emit('search', h)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
