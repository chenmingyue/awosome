import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/Pos'
import Store from '@/components/store'
import Goods from '@/components/goods'
import Member from '@/components/member'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: Pos

    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/goods',
      name: 'good',
      component: Goods
    }
  ]
})
