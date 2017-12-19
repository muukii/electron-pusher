import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'edit-payload-page',
      component: require('@/components/EditPayloadPage/EditPayloadPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
