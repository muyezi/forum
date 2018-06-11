<template>
  <div class="content">
    <!-- <loading :show="true"></loading> -->
    <div class="loadmore-wrap"  ref="loadmore">
        <div class="article-item-wrap">
          <router-link tag="div" :to="{name:'detail',params:{id:item.id}}" v-for="(item,index) in list" :key="index">
            <div class="article-item">
              <img class="article-item-img" :src="item.author.avatar_url">
              <div class="article-item-detail">
                  <h3>
                    <span class="put-top" v-if="item.top || item.good">
                      {{item.top ? '置顶':'精华'}}
                    </span>
                    <span class="put-top put-tag" v-else>{{tabTag[item.tab]}}</span>
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
        </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading/loading.vue'
import BScroll from 'better-scroll'
export default {
  name: 'home',
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10,
      tab: this.$route.params.tab || 'all'
    }
  },
  components: {
    loading
  },
  mounted() {
    this.initShow()
    console.log(this.tabTag)
  },
  methods: {
    initShow(isRefresh) {
      this.$http
        .get('topics', {
          params: { page: this.pagenum, tab: this.tab, limit: this.pagesize }
        })
        .then(res => {
          if (isRefresh) {
            this.$spin.hide()
            this.list = res
          } else {
            this.list = this.list.concat(res)
          }
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.loadmore, { click: true })
              this.scroll.on('scrollStart', pos => {
                // console.log('开')
                // this.$spin.show()
              })
              this.scroll.on('touchEnd', pos => {
                // 上拉加载
                if (pos.y < -50) {
                  this.pagenum++
                  this.initShow()
                }
                if (pos.y > 50) {
                  this.pagenum = 1
                  this.initShow(true)
                }
              })
            } else {
              this.scroll.refresh()
            }
          })
        })
    },
    changeTab() {
      this.tab = this.$route.params.tab
      // this.list = []
      this.initShow()
    }
  },
  watch: {
    $route: 'changeTab'
  }
}
</script>


<style lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.loadmore-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.article-item-wrap {
  margin-top: 0.2rem;
  padding: 0 0.1rem;
}
</style>
