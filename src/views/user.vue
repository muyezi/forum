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
      <keep-alive>
        <yd-tab active-color='#333' class="user-tab">
          <yd-tab-panel label="发布">
            <news-item v-if="user.recent_replies.length" v-for="(item,index) in user.recent_topics" :item="item" :hideTag="true" :key="index"></news-item>
            <div v-else>暂无数据</div>
          </yd-tab-panel>
          <yd-tab-panel label="回复">
              <news-item v-if="user.recent_replies.length" v-for="(item,index) in user.recent_replies" :item="item" :hideTag="true" :key="index"></news-item>
              <div v-else>暂无数据</div>
          </yd-tab-panel>
          <yd-tab-panel label="收藏">
              <news-item v-if="collect.length" v-for="(item,index) in collect" :item="item" :key="index"></news-item>
              <div v-else>暂无数据</div>
          </yd-tab-panel>
        </yd-tab>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import newsItem from '../components/news-item'
export default {
  data() {
    return {
      user: {},
      collect: []
    }
  },
  components: {
    newsItem
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
