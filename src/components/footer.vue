<template>
  <div class="footer">
    <yd-backtop></yd-backtop>
    <nav>
      <ul class="header-nav">
        <router-link :to="{name:'Home'}" tag="li">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-home"></use>
          </svg>
          <p>首页</p>
        </router-link>
        <router-link :to="{name:'message'}" tag="li">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-msg"></use>
          </svg>
          <span class="msg-num" v-if="hasnotReadNum!=0">{{hasnotReadNum}}</span>
          <p>消息</p>
        </router-link>
        <router-link :to="{name:'publish'}" tag="li">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-publish"></use>
          </svg>
          <p>发表</p>
        </router-link>
        <router-link :to="{name:'user'}" tag="li">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mine"></use>
          </svg>
          <p>我的</p>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'fixFooter',
  computed: mapState(['hasnotReadNum']),
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/common/variables';
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
  color: #909ba5;
  // .back-top {
  //   position: fixed;
  //   right: 0.1rem;
  //   bottom: 1.2rem;
  //   width: 0.8rem;
  //   height: 0.8rem;
  //   line-height: 0.8rem;
  //   border-radius: 0.8rem;
  //   background-color: #ddd;
  //   color: #666;
  //   font-size: 0.5rem;
  //   text-align: center;
  //   &:hover {
  //     color: $mcolor;
  //     background-color: #fff;
  //     border: 0.01rem solid $mcolor;
  //   }
  // }
  ul {
    overflow: hidden;
  }
  nav .icon {
    font-size: 0.4rem;
  }
  li {
    position: relative;
    padding: 0.05rem 0;
    list-style: none;
    float: left;
    width: 25%;
    padding: 0.1rem 0;
    text-align: center;
    &.active {
      background-color: $mcolor;
    }
    p {
      line-height: 1.1;
    }
    &.active {
      color: $mcolor;
    }
  }
  .msg-num {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.4rem;
    background-color: $mcolor;
    color: #fff;
    text-align: center;
  }
  // .router-link-active {
  //   color: $mcolor;
  // }
  .router-link-exact-active {
    color: #333;
  }
}
</style>
