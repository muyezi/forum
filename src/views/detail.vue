<template>
  <div class="detail-content article">
      <div v-if="article.author" class="article-item">
        <img class="article-item-img" v-if="article.author" :src="article.author.avatar_url">
        <div class="article-item-detail">
            <h3>
              <span class="put-top" v-if="article.top || article.good">
                {{article.top ? '置顶':'精华'}}
              </span>
              <span class="put-top" v-else>{{tabTag[article.tab]}}</span>
              {{article.title}}
            </h3>
            <div class="article-item-info">
                <div class="time">{{article.create_at|dateDistance}}</div>
                <div class="writer" v-if="article.author">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bi"></use>
                  </svg>
                  {{article.author.loginname}}
                </div>
            </div>
            <div class="article-item-info">
                <div class="time">{{article.last_reply_at|dateDistance}}</div>
                <div class="browse">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-browse"></use>
                  </svg>
                  {{article.visit_count}}
                </div>
            </div>
        </div>
      </div>
      <div class="article-inner markdown-body">
        <h2>{{article.titile}}</h2>
        <div class="article-content" v-html="article.content"></div>

        <div v-if="article.reply_count" class="article-comment-btn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          共{{article.reply_count}}条评论
        </div>
        <div class="article-comment">
          <div class="article-comment-box" v-for="(item,index) in replies" :key="index">
            <img :src="item.author.avatar_url">
            <div class="article-comment-box-floor">{{index}}楼</div>
            <div class="article-comment-box-detail">
              <div class="article-comment-box-name">
                {{item.author.loginname}}
              
                <div class="article-comment-box-Reply" @click="repliesOthers(item)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                  </svg>
                </div>

                <div class="article-comment-box-zan" @click="setUps(item.author.loginname,item.id,index)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zan"></use>
                  </svg>{{item.ups.length || ''}}
                </div>
              </div>
              <div class="artocle-comment-box-txt" v-html="item.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="article-say">
        <div class="article-say-photo">
          <img :src="user.avatar_url">
        </div>
        <textarea ref="replyTextarea" v-model="content" name="" id="" cols="30" rows="10" placeholder="朕说两句..."></textarea>
        <div class="article-say-btn" @click="submitReplies">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-publish"></use>
          </svg>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data() {
    return {
      article: {},
      replies: [], // 评论
      content: '', // 评论内容
      reply_id: '', // 回复评论id
      topic_id: '' // 文章id
    }
  },
  computed: mapState(['user']),
  created() {
    this.$spin.show()
    this.$http.get('topic/' + this.$route.params.id).then(res => {
      this.$spin.hide()
      this.article = res
      this.replies = this.article.replies
      this.topic_id = res.id
    })
  },
  methods: {
    // 提价评论
    submitReplies() {
      this.$http
        .post(
          `topic/${this.topic_id}/replies`,
          {
            content: this.content,
            reply_id: this.reply_id
          },
          { direct: true }
        )
        .then(res => {
          console.log('res', res)
          let newReplies = {
            author: {
              loginname: this.user.loginname,
              avatar_url: this.user.avatar_url
            },
            content: `<div class="markdown-text"><p><a href="/user/${
              this.content.split(' ')[0]
            }">${this.content.split(' ')[0]}</a> ${
              this.content.split(' ')[1]
            }</p></div>`,
            create_at: new Date(),
            id: res.reply_id,
            is_uped: false,
            reply_id: null,
            ups: []
          }
          this.replies.push(newReplies)
          this.article.reply_count++
          this.content = ''
        })
    },
    // 点击回复他人评论
    repliesOthers(item) {
      this.content = `@${item.author.loginname} `
      this.reply_id = item.id
      this.$refs.replyTextarea.focus()
    },
    // 点赞
    setUps(name, id, ind) {
      // console.log(
      //   name + ',' + this.user.loginname + ',' + ind + ',' + this.user.id
      // )
      if (name === this.user.loginname) {
        this.$dialog.toast({ mes: '亲，不能给自己点赞哦！', timeout: 1500 })
        return
      }
      this.$http
        .post(`reply/${id}/ups`, {}, { direct: true })
        .then(({ action }) => {
          let ups = this.replies[ind].ups
          let id = this.user.id
          if (action === 'up') {
            this.replies[ind].ups.push(id)
          }
          if (action === 'down') {
            this.replies[ind].ups = ups.filter(v => v != id)
          }
          console.log(this.replies[ind].ups)
        })
    }
  }
}
</script>


<style lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.ivu-spin-fix {
  background: #f3f3f3 !important;
  top: 0.8rem !important;
}
.ivu-spin-dot {
  background-color: $mcolor !important;
}
.ivu-spin-fix .ivu-spin-main {
  top: 10% !important;
}

.article {
  position: relative;
  .article-item {
    padding: 0.1rem;
    border-bottom: 0.1rem solid #eee;
  }
  .article-inner {
    padding: 0 0.1rem;
    text-align: left;
  }
  .article-content {
    h3 {
      font-size: 0.3rem;
      margin: 0.1rem 0 0.15rem;
      font-weight: bold;
    }
    h4 {
      font-size: 0.28rem;
      margin: 0.1rem 0 0.15rem;
    }
    p {
      margin: 0.2rem 0;
    }
    img {
      margin: 0.2rem 0;
    }
  }
}
.article-comment {
}
.article-comment-btn {
  background-color: $mcolor;
  color: #fff;
  line-height: 0.8rem;
  height: 0.8rem;
  text-align: center;
}
.article-comment {
}
.article-comment-box-floor {
  position: absolute;
  left: 0.1rem;
  top: 1.5rem;
  width: 1.2rem;
  text-align: center;
  color: #999;
}
.article-comment-box {
  position: relative;
  overflow: hidden;
  padding: 0.3rem 0.1rem;
  a {
    color: $mcolor;
  }
  img {
    width: 1.2rem;
    height: 1.2rem;
    float: left;
    border-radius: 0.08rem;
    margin-right: 0.3rem;
  }
  &-detail {
    padding-left: 1.5rem;
  }
  &-name {
    margin-bottom: 0.15rem;
  }
  &-zan {
    float: right;
    margin-right: 0.3rem;
    &:hover {
      color: $mcolor;
    }
  }
  &-Reply {
    float: right;
    &:hover {
      color: $mcolor;
    }
  }
  &-txt {
  }
}

.article-say {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
  align-items: center;
  &-photo {
    width: 1rem;
    padding: 0.1rem;
    img {
      width: 100%;
      height: auto;
      border-radius: 100%;
    }
  }
  textarea {
    width: 100%;
    height: 0.5rem;
    padding: 0.05rem 0.1rem;
    border-top: none;
    border-bottom: none;
    margin: 0.1rem 0;
    border-color: #999;
  }
  &-btn {
    width: 1rem;
    font-size: 0.4rem;
    color: #666;
  }
}
</style>
