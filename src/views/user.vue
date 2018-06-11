<template>
  <div class="detail-content">
    <div class="user">
      <div class="user-info">
        <div class="user-photo"><img :src="user.avatar_url"></div>
        <ul class="user-list">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mine"></use>
            </svg> {{user.loginname}}
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-integral"></use>
            </svg> {{user.score}}分
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time"></use>
            </svg> {{user.create_at | formateDate}}
          </li>
        </ul>
        <ul class="user-list">
          <router-link tag="li" :to="{name:'publish'}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-edit"></use>
            </svg> 发布话题
          </router-link>
           <li @click="exit">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-exit"></use>
            </svg> 退出
           </li>
        </ul>
      </div>
       <yd-tab active-color='#333' class="user-tab">
        <yd-tab-panel label="发布">
          <router-link v-if="user.recent_replies.length" tag="div" :to="{name:'detail',params:{id:item.id}}"  v-for="(item,index) in user.recent_topics" :key="index">
          <div class="article-item">
              <img class="article-item-img" :src="item.author.avatar_url">
              <div class="article-item-detail">
                  <h3>{{item.title}}</h3>
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
          <div v-else>暂无数据</div>
        </yd-tab-panel>
        <yd-tab-panel label="回复">
            <router-link v-if="user.recent_replies.length" tag="div" :to="{name:'detail',params:{id:item.id}}"  v-for="(item,index) in user.recent_replies" :key="index">
            <div class="article-item">
                <img class="article-item-img" :src="item.author.avatar_url">
                <div class="article-item-detail">
                    <h3>{{item.title}}</h3>
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
            <div v-else>暂无数据</div>
        </yd-tab-panel>
        <yd-tab-panel label="收藏">
            <router-link  v-if="collect.length" tag="div" :to="{name:'detail',params:{id:item.id}}"  v-for="(item,index) in collect" :key="index">
            <div class="article-item">
                <img class="article-item-img" :src="item.author.avatar_url">
                <div class="article-item-detail">
                    <h3>
                      <span class="put-top" v-if="item.top || item.good">
                        {{item.top ? '置顶':'精华'}}
                      </span>
                      <span class="put-top" v-else>{{tabTag[item.tab]}}</span>
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
            <div v-else>暂无数据</div>
        </yd-tab-panel>
    </yd-tab>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: {},
      collect: []
    }
  },
  computed: mapState({
    loginname: state => state.user.loginname
  }),
  created() {
    this.$http.get('/user/' + this.loginname).then(res => {
      this.user = res
    })
    this.$http.get('/topic_collect/' + this.loginname).then(res => {
      this.collect = res
    })
  },
  methods: {
    exit() {
      this.$dialog.confirm({
        title: '',
        mes: '您确定退出登录吗？',
        timeout: 1500,
        opts: () => {
          this.$store.commit('clearUser')
          this.$store.commit('clearMsgReadNum')
          this.$router.push({ name: 'Home', params: { tab: '' } })
        }
      })
    }
  }
}
</script>

<style  lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.user {
  color: #fff;
  .user-tab .yd-tab-panel {
    background-color: transparent;
    color: #333;
    padding-top: 0.15rem;
  }
  .user-info {
    padding: 0.15rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 0.28rem;
    text-align: left;
    background-color: darken($color: $mcolor, $amount: 5);
    .icon {
      font-size: 0.3rem;
      color: #fff !important;
    }
  }
  .user-photo {
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    background: #fff;
    border-radius: 1.5rem;
    margin-right: 0.15rem;
    overflow: hidden;
  }
  &-list {
    li {
      height: 0.5rem;
    }
  }
}
</style>
