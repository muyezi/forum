<template>
  <router-link tag="div" :to="{name:'detail',params:{id:item.id}}" v-if="item">
          <div class="article-item">
            <img class="article-item-img" src="../assets/default.png" :src="item.author.avatar_url">
            <div class="article-item-detail">
                <h3>
                  <span v-if="!hideTag">
                    <span class="put-top" v-if="item.top || item.good">
                      {{item.top ? '置顶':'精华'}}
                    </span>
                    <span class="put-top put-tag" v-else>{{tabTag[item.tab]}}</span>
                  </span>
                  {{item.title}}
                </h3>
                <div class="article-item-info">
                    <div class="time">{{item.create_at|dateDistance}}</div>
                    <div class="writer">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bi"></use>
                      </svg>
                      {{item.author.loginname}}
                    </div>
                </div>
                <div class="article-item-info">
                    <div class="time">{{item.last_reply_at|dateDistance}}</div>
                    <div class="browse">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-browse"></use>
                      </svg>
                      {{item.visit_count}}
                    </div>
                </div>
            </div>
          </div>
  </router-link>
</template>

<script>
export default {
  name: 'home',
  props: ['item', 'hideTag']
}
</script>


<style lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
// 栏目
.article-item {
  background-color: #fff;
  padding: 0.1rem;
  overflow: hidden;
  text-align: left;
  margin-bottom: 0.15rem;
  &-img {
    float: left;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 0.2rem;
    margin-right: 0.15rem;
  }
  &-detail {
    color: #999;
  }
  .put-top {
    padding: 0 0.1rem;
    border-radius: 0.02rem;
    background-color: $mcolor;
    color: #fff;
    margin-right: 0.1rem;
  }
  .put-tag {
    background-color: #b6b6b6;
  }
  h3 {
    @include ellipsis;
    color: #333;
    padding-top: 0.1rem;
  }
  .article-item-info {
    overflow: hidden;
    margin-top: 0.15rem;
    font-family: Georgia;
    font-size: 0.24rem;
  }
  .writer {
  }
  .browse {
  }
  .time {
    float: right;
  }
  .article-item-msg-author {
    .msg-time {
      float: right;
    }
  }
  .article-item-msg-title {
    color: #666;
    span {
      color: $scolor;
    }
  }
  .article-item-msg-content {
    color: #333;
  }
}
</style>
