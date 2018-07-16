import Vue from 'vue'
import Router from 'vue-router'
import Home from '@home/Home.vue'
import About from '@home/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
