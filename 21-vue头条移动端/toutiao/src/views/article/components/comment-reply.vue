<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close-reply')"
      ></van-icon>
    </van-nav-bar>
    <comment-item :comment="comment" />
    <van-cell title="全部回复"></van-cell>
    <comment-list :source="comment.com_id" type="c" />
    <div class="reply-bottom">
      <van-button class="reply-btn" round @click="isPostShow = true"
        >写回复</van-button
      >
    </div>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
export default {
  name: 'CommentReply',
  data() {
    return {
      isPostShow: false
    }
  },
  methods: {},
  components: {
    CommentItem,
    CommentList
  },
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
.comment-reply {
  .reply-bottom {
    padding: 5px;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .reply-btn {
      background-color: #ededf5;
      width: 200px;
      height: 30px;
      color: #b4b4b4;
    }
  }
}
</style>
