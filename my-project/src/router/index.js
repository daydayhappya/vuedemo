import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout'
import List from '@/pages/List'
let Page1  = ()=> import('@/pages/Page1');
let Page2  = ()=> import('@/pages/Page2');


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
    {
      path: '/Page1',
      name: 'Page1',
      component: Page1
    },
    {
      path: '/Page2',
      name: 'Page2',
      component: Page2
    }
  ]
  },
  {
    path: '/List',
    name: 'List',
    component: List
  },
]
})