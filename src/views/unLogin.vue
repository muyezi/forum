<template>
  <div class="detail-content">
    <div class="unlogin">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-node"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-nodejs"></use>
      </svg>
      <div>还未登录，现在就去 <router-link :to="{name:'login'}" tag="span" class="btn">登录</router-link></div>
    </div>
  </div>
</template>

<script>
</script>

<style  lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.unlogin {
  .iconn {
    color: $mcolor;
  }
  .btn {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border: 1px solid $mcolor;
  }
}
</style>
