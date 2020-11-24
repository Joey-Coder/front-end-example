<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      :src="comment.aut_photo"
      round
      fit="cover"
      class="avatar"
    ></van-image>
    <div slot="title">
      <div class="name-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            class="like-icon"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :color="comment.is_liking ? 'orange' : ''"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{
          comment.pubdate | datetime('MM-DD HH:mm')
        }}</span>
        <van-button
          round
          size="mini"
          class="reply-btn"
          @click="$emit('reply-click', comment)"
          >{{ comment.reply_count }}回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  data() {
    return {}
  },
  methods: {
    async onCommentLike() {
      const t = this.$toast.loading({
        message: '操作中',
        duration: 3000,
        forbidClick: true
      })
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
      t.clear()
      this.$toast.success(`${this.comment.is_liking ? '' : '取消'}点赞成功`)
    }
  },
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name-wrap {
    display: flex;
    justify-content: space-between;
    .name {
      font-size: 14px;
      color: #007f80;
    }
  }
  .content {
    font-size: 16px;
    color: #333;
  }
  .pubdate {
    font-size: 10px;
    color: #b4b4b4;
    margin-right: 15px;
  }
  .reply-btn {
    font-size: 12px;
    color: #333;
    width: 50px;
    height: 20px;
  }
}
</style>
