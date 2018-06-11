<template>
  <div class="detail-content">
    <div class="message">
      <yd-tab active-color='#333' class="user-tab">
        <yd-tab-panel :label="'未读消息('+hasnotReadNum+')'">
            <div class="article-item" v-for="(item,index) in hasnot_read_messages" :key="index">
            <img class="article-item-img" :src="item.author.avatar_url">
            <div class="article-item-detail">
                <div class="article-item-msg-author">{{item.author.loginname}} <span class="msg-time">{{item.create_at|dateDistance}}</span></div>
                <h3 class="article-item-msg-title">在话题<router-link tag="span" :to="{name:'detail',params:{id:item.topic.id}}">{{item.topic.title}}</router-link>回复了你!</h3>
                <div class="article-item-msg-content" v-html="item.reply.content"></div>
            </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel  :label="'已读消息('+hasReadNum+')'">
          <div class="article-item" v-for="(item,index) in has_read_messages" :key="index">
            <img class="article-item-img" :src="item.author.avatar_url">
            <div class="article-item-detail">
                <div class="article-item-msg-author">{{item.author.loginname}} <span class="msg-time">{{item.create_at|dateDistance}}</span></div>
                <h3 class="article-item-msg-title">在话题<router-link tag="span" :to="{name:'detail',params:{id:item.topic.id}}">{{item.topic.title}}</router-link>回复了你!</h3>
                <div class="article-item-msg-content" v-html="item.reply.content"></div>
            </div>
          </div>
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
      has_read_messages: [],
      hasnot_read_messages: []
    }
  },
  computed: mapState(['accesstoken', 'hasnotReadNum', 'hasReadNum']),
  created() {
    this.$http
      .get('/messages', { params: { accesstoken: this.accesstoken } })
      .then(res => {
        this.has_read_messages = res.has_read_messages
        this.hasnot_read_messages = res.hasnot_read_messages
        this.$store.commit('setMsgReadNum', [
          this.hasnot_read_messages.length,
          this.has_read_messages.length
        ])
      })
  },
  methods: {}
}
</script>

<style  lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.message {
  .article-item {
    margin-bottom: 0.2rem;
  }
  .yd-tab-panel {
    margin-top: 0.1rem;
    background-color: #f3f3f3;
  }
}
</style>
