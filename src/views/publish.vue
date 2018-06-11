<template>
  <div class="detail-content">
    <div class="publish">
      <form ref="publishForm">
      <input v-model="title" type="text" placeholder="给标题取个名！">
      <textarea v-model="content" name="" id="" cols="30" rows="10" placeholder="说点什么吧..."></textarea>
      <div class="publish-tab">
      <span class="label" for="">选择板块:</span>
      <yd-radio-group v-model="tab" color="#333">
        <yd-radio val="ask">问答</yd-radio>
        <yd-radio val="share">分享</yd-radio>
        <yd-radio val="job">招聘</yd-radio>
        <yd-radio val="dev">测试</yd-radio>
      </yd-radio-group>
      </div>
      <input type="button" value="提交" class="submit" @click="publish">
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '我的测试我的测试我的测试我的测试',
      content: '成功',
      tab: 'dev'
    }
  },
  computed: mapState(['accesstoken']),
  methods: {
    publish() {
      if (!this.title || !this.content) {
        this.$dialog.toast({ mes: '标题和内容均不能为空！', timeout: 1500 })
        return
      }
      this.$http
        .post('/topics', {
          title: this.title,
          content: this.content,
          tab: this.tab,
          accesstoken: this.accesstoken
        })
        .then(() => {
          this.$dialog.toast({ mes: '发布成功！', timeout: 1500 })
          // this.$refs.publishForm.reset()
          this.$router.push({ name: 'user' })
        })
    }
  }
}
</script>

<style  lang="scss">
@import '../assets/styles/common/variables';
@import '../assets/styles/common/mixin';
.publish {
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.15rem;
  }
  input {
    display: block;
    height: 0.8rem;
  }
  textarea {
    display: block;
  }
  .publish-tab {
    margin-top: 0.3rem;
    .label {
      float: left;
      font-size: 0.28rem;
      margin-left: 0.15rem;
    }
  }
  .submit {
    display: block;
    width: 80%;
    margin: 0 auto;
    background-color: #333;
    color: #fff;
    margin-top: 0.3rem;
    border: none;
    border-radius: 0.1rem;
  }
}
</style>
