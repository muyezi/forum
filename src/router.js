import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import detail from './views/detail.vue'
import login from './views/login.vue'
import user from './views/user.vue'
import message from './views/message.vue'
import publish from './views/publish.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/index/:tab',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
      meta: {
        name: '详情',
        hideFooter: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        name: '登录'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        name: '我的',
        needLogin: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        name: '消息',
        needLogin: true
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish,
      meta: {
        name: '分享',
        needLogin: true
      }
    }
  ]
})


import {
  LoadingBar
} from 'iview';

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  let TOKEN = localStorage.getItem('accesstoken')
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (TOKEN) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })
    }
  } else {
    next();
  }
});

router.afterEach(route => {
  LoadingBar.finish();
});
LoadingBar.config({
  color: '#ffe318',
  failedColor: '#f0ad4e',
});

export default router