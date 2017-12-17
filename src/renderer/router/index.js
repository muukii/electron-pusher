import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list-page',
      component: require('@/components/ListPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
