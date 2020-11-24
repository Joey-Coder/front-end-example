<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      /> -->
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      // 数组和对象类型必须通过函数返回
      default: function() {
        return []
      }
    },
    type: {
      type: String,
      // 默认获取文章评论
      default: 'a'
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        // a表示对文章评论，c表示对评论回复
        type: this.type,
        // 文章id或评论id
        source: this.source.toString(),
        // 下一页偏移位置
        offset: this.offset,
        // 一页多少条
        limit: this.limit
      })
      const { results } = data.data
      // console.log(results)
      this.list.push(...results)
      this.$emit('update-total-count', data.data.total_count)

      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  components: {
    CommentItem
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less"></style>
