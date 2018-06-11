<template>
  <div id="app">
    <vheader v-if="$route.name==='Home'"></vheader>
    <vheaderTop v-else></vheaderTop>
    <router-view/>
    <vfooter v-if="!$route.meta.hideFooter"></vfooter>
  </div>
</template>
<script>
// @ is an alias to /src
import vheader from '@/components/header.vue'
import vheaderTop from '@/components/header-top.vue'
import vfooter from '@/components/footer.vue'

export default {
  name: 'home',
  components: {
    vheader,
    vheaderTop,
    vfooter
  },
  data() {
    return {
      arr: [1, 2, 3]
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
