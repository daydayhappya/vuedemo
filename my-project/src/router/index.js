import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout'
import List from '@/pages/List'
import Page1 from '@/pages/Page1'
import Page2 from '@/pages/Page2'
import Page3 from '@/pages/Page3'

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
    },
    {
      path: '/Page3',
      name: 'Page3',
      component: Page3
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