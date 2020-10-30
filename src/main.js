// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
//import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入 ElementUI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.css'
// import {getImageToken} from './common.js';
import Print from 'vue-print-nb';
// import Print from '@/print'

// Vue.prototype.getImageToken = getImageToken;
/* 路由发生变化修改页面title */
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

Vue.config.productionTip = false
// 安装 elementUI
Vue.use(ElementUI)
Vue.use(Print)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
