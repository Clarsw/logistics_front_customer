// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  let auth = sessionStorage.getItem('username')
  if (to.meta.requireAuth === true) {
    console.log('0')
    if (auth) {
      console.log('1')
      next()
    } else {
      console.log('2')
      next('/login')
    }
  } else if (to.path === '/login' || to.path === '/register') { // 如果是登录页面，就直接next(),释放钩子
    if (auth) {
      console.log('2')
      next('/self')
    } else {
      next()
    }
  } else {
    next()
  }
})
