<template>
    <div class="article-comment-box">
      <img @error="setDefaultImg" :src="item.author.avatar_url">
      <div class="article-comment-box-floor">{{index}}楼</div>
      <div class="article-comment-box-detail">
        <div class="article-comment-box-name">
          {{item.author.loginname || ''}}
        
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
</template>

<script>
export default {
  props: ['item', 'index'],
  methods: {
    // 点击回复他人评论
    repliesOthers(item) {
      this.content = `@${item.author.loginname} `
      this.reply_id = item.id
      this.$refs.replyTextarea.focus()
    },
    // 点赞
    setUps(name, id, ind) {
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
</style>
