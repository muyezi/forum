export default {
  install(Vue, options) {
    Vue.myGlobalMethod = function () { // 1. 添加全局方法或属性，如:  vue-custom-element
    }

    Vue.directive('my-directive', { // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
      bind(el, binding, vnode, oldVnode)
    })

    Vue.mixin({
      created: function () { // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
      }
    })

    Vue.prototype.$myMethod = function (options) { // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现

    }
  }
}