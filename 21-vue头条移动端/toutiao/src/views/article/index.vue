<template>
  <div class="article-container">
    <!-- app导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="article-wrap">
      <!-- article title -->
      <h1 class="title">{{ article.title }}</h1>
      <!-- about author -->
      <van-cell center class="user-info">
        <!-- author name -->
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <!-- avatar -->
        <van-image
          slot="icon"
          :src="article.aut_photo"
          round
          fit="cover"
          class="avatar"
        ></van-image>
        <!-- pubdate -->
        <div slot="label" class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          slot="right-icon"
          round
          size="small"
          :type="article.is_followed ? 'default' : 'info'"
          class="follow-btn"
          :icon="article.is_followed ? '' : 'plus'"
          @click="onFollow"
          :loading="buttonLoading"
          >{{ article.is_followed ? '已关注' : '未关注' }}</van-button
        >
      </van-cell>

      <!-- article content -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="articleBodyRef"
      ></div>
      <!-- 分割线 -->
      <van-divider>正文结束</van-divider>
      <!-- 评论列表 -->
      <comment-list
        :source="articleId"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      />
    </div>

    <!-- 底部栏  -->
    <div class="article-bottom">
      <van-button type="default" class="comment-btn" @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="totalCommentCount"></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : ''"
        @click="onCollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'orange' : ''"
        @click="onLike"
      ></van-icon>
      <van-icon name="share-o"></van-icon>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <comment-reply
        v-if="isReplyShow"
        :comment="replyComment"
        @close-reply="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list'

export default {
  name: 'ArticleIndex',
  data() {
    return {
      article: {},
      buttonLoading: false,
      isPostShow: false,
      commentList: [],
      totalCommentCount: 0, // 评论总数
      isReplyShow: false,
      replyComment: {}
    }
  },
  components: { CommentList, PostComment, CommentReply },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    // 获取文章内容
    async loadArticle() {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data
      // 获取所有文章图片进行预览
      // 因为data更新不会马上影响到dom，如果需要使data的修改马上更新到dom，需要使用nextTick方法
      this.$nextTick(() => {
        const imgs = this.$refs.articleBodyRef.querySelectorAll('img')
        // 存储img链接地址
        const imgsPaths = []
        imgs.forEach((img, index) => {
          // 遍历时先把链接存到列表里
          imgsPaths.push(img.src)
          img.onclick = function() {
            ImagePreview({
              images: imgsPaths,
              startPosition: index,
              closeable: true
            })
          }
        })
        // console.log(imgs)
      })
    },
    // 关注作者事件
    async onFollow() {
      // 已关注，取消关注
      this.buttonLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.buttonLoading = false
      this.article.is_followed = !this.article.is_followed
    },
    /**
     * 收藏文章事件
     */
    async onCollect() {
      const t = this.$toast.loading({
        // 持续时间
        duration: 3000,
        message: '操作中',
        forbidClick: true
      })
      if (this.article.is_collected) {
        await deleteCollect(this.article.art_id)
      } else {
        await addCollect(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
      // 关闭toast
      t.clear()
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    /**
     * 点赞文章事件
     */
    async onLike() {
      const t = this.$toast.loading({
        // 持续时间
        duration: 3000,
        message: '操作中',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.article.art_id)
        this.article.attitude = -1
      } else {
        await addLike(this.article.art_id)
        this.article.attitude = 1
      }
      // 关闭toast
      t.clear()
      this.$toast.success(
        `${this.article.attitude === 1 ? '' : '取消'}点赞成功`
      )
    },
    // 子组件post-comment调用，往评论列表中追加最新的评论内容
    onPostSuccess(comment) {
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isPostShow = false
    },
    //
    onReplyClick(comment) {
      console.log(comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  },

  created() {
    this.loadArticle()
  },
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less">
.article-container {
  .article-wrap {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    top: 46px;
    overflow-y: auto;
    .title {
      font-size: 20px;
      color: #333;
      padding: 14px;
      background-color: #fff;
      margin: 0;
    }
    .user-info {
      .name {
        font-size: 12px;
        color: #333;
      }
      .pubdate {
        font-size: 11px;
        color: #b4b4b4;
      }
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
      /deep/ .van-cell__label {
        margin-top: 0;
      }
    }
    .markdown-body {
      padding: 14px;
      background-color: #fff;
    }
  }
  .article-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    .comment-btn {
      color: #b4b4b4;
      width: 140px;
      height: 30px;
      margin: 10px 0;
      border-radius: 10px;
    }
  }
}
</style>
