<template>
  <div class="detail-content">
    <div class="user-login-form">
      <div class="ipt-row">
      <input v-model="userToken" class="inpt" type="text" name="user-token" placeholder="Access Token">
    </div>
    <div class="ipt-row">
        <input ref="btnLogin" :disabled="isDisabled" @click="submit" class="btn-login" type="submit" name="btn-submit" :value="isDisabled?'登录中...':'登录'">
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from '../store'
export default {
  data() {
    return {
      userToken: '',
      isDisabled: false
    }
  },
  // computed: mapState(['accesstoken']),
  methods: {
    submit() {
      console.log(this.$route.query.redirect)
      console.log(this.$route.query)

      if (!this.userToken) {
        this.$dialog.toast({
          mes: 'token不能为空',
          timeout: 1500
        })
        return
      }
      this.isDisabled = true
      this.$http
        .post('/accesstoken', { accesstoken: this.userToken }, { direct: true })
        .then(res => {
          this.isDisabled = false
          // console.log(res)
          localStorage.setItem('user', JSON.stringify(res))
          localStorage.setItem('accesstoken', this.userToken)
          // console.log(this.route.query.redirect)
          this.$store.commit('setUser')
          this.$store.dispatch('getMsg')
          if (this.$route.query.redirect) {
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            this.$router.push({ path: '/user' })
          }
        })
        .catch(() => {
          this.isDisabled = false
          this.$dialog.toast({
            mes: 'token错误',
            timeout: 1500
          })
        })
    }
  }
}
</script>

<style  lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.user-login-form {
  background-color: #f3f3f3;
  width: 80%;
  margin: 0 auto;
  padding-top: 3rem;
  input {
    width: 100%;
    height: 0.8rem;
    border-radius: 0.1rem;
  }
  .inpt {
    background: #fff;
    color: #666;
    border: none;
    padding: 0.1rem;
  }
  .btn-login {
    margin-top: 0.5rem;
    background-color: $mcolor;
    color: #fff;
  }
}
</style>
