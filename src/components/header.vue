<template>
  <div class="header">
    <h1 class="header-title">nodejs</h1>
    <nav>
      <ul class="header-nav">
        <router-link tag="li" :to="{name:'Home',params:{tab:'all'}}">全部</router-link>
        <router-link tag="li" :to="{name:'Home',params:{tab:'good'}}">精华</router-link>
        <router-link tag="li" :to="{name:'Home',params:{tab:'share'}}">分享</router-link>
        <router-link tag="li" :to="{name:'Home',params:{tab:'ask'}}">问答</router-link>
        <router-link tag="li" :to="{name:'Home',params:{tab:'job'}}">招聘</router-link>
        <router-link tag="li" :to="{name:'Home',params:{tab:'dev'}}">测试</router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'fixheader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/common/variables';
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  &-title {
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    background-color: $mcolor;
  }
  ul {
    overflow: hidden;
    background-color: #f6f6f6;
  }
  li {
    list-style: none;
    float: left;
    width: percentage(1/6);
    padding: 0.1rem 0;
    color: $mcolor;
    &.active {
      background-color: $mcolor;
    }
  }
  .router-link-exact-active {
    border-bottom: 0.04rem solid $mcolor;
  }
}
</style>
