import Vue from 'vue'
import Router from 'vue-router'
import Square from '../views/Square.vue'
import About from '../views/About.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'square',
      component: Square
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
