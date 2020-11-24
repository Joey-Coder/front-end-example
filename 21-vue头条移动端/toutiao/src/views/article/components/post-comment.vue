<template>
  <div class="post-comment">
    <!-- 评论输入框 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
      autofocus
    />
    <van-button
      type="info"
      size="mini"
      class="comment-btn"
      round
      @click="onPost"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onPost() {
      const t = this.$toast.loading({
        duration: 3000,
        message: '评论中',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString()
      })
      this.$emit('post-success', data.data.new_obj)
      t.clear()
      this.$toast.success(`评论${data.message === 'OK' ? '成功' : '失败'}`)
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less">
.post-comment {
  background-color: #ededf5;
  padding: 10px;
  display: flex;
  //   justify-content: space-between;
  align-items: flex-end;
  .comment-btn {
    width: 50px;
    height: 30px;
    margin-left: 10px;
  }
}
</style>
