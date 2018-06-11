<template>
  <div class="content">
    <loading :show="isLoading"></loading>
    <div class="loadmore-wrap"  ref="loadmore">
        <div class="article-item-wrap">
          <news-item v-for="(item,index) in list" :item="item" :key="index"></news-item>
        </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading/loading.vue'
import BScroll from 'better-scroll'
import newsItem from '../components/news-item'
export default {
  name: 'home',
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10,
      tab: this.$route.params.tab || 'all',
      isLoading: false
    }
  },
  components: {
    loading,
    newsItem
  },
  mounted() {
    this.initShow()
  },
  methods: {
    initShow(isRefresh) {
      this.$http
        .get('topics', {
          params: { page: this.pagenum, tab: this.tab, limit: this.pagesize }
        })
        .then(res => {
          if (isRefresh) {
            // this.$spin.hide()
            this.isLoading = false
            this.list = res
          } else {
            this.list = this.list.concat(res)
          }
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.loadmore, { click: true })
              this.scroll.on('scrollStart', pos => {
                console.log(pos)
                // this.$spin.show()
                this.isLoading = true
              })
              this.scroll.on('touchEnd', pos => {
                this.isLoading = false
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
      this.initShow(true)
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
