<template>
  <div class="search-history-container">
    <van-cell title="历史记录">
      <!-- <div>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div> -->
      <van-icon name="delete" size="16px"></van-icon>
    </van-cell>
    <van-cell title="history1">
      <van-icon name="close" size="16px"></van-icon>
    </van-cell>
    <van-cell title="history1">
      <van-icon name="close" size="16px"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  created() {},
  mounted() {},
  data() {
    return {}
  },
  props: {},
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
