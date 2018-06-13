<template>
  <div class="header-top">
    <span class="back" @click="gobanck">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-back"></use>
      </svg>
    </span>{{$route.meta.name}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevPath: '/'
    }
  },
  name: 'headerTop',
  props: {
    msg: String
  },
  methods: {
    gobanck() {
      console.log(this.$router)
      this.$router.go(-1)
    }
  },
  created() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/common/variables';
.header-top {
  text-align: center;
  background-color: $mcolor;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
  font-size: 0.3rem;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .back {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 0.8rem;
    font-size: 26px;
    padding: 0.1rem 0 0 0.1rem;
    text-align: left;
    color: #fff;
  }
}
</style>
