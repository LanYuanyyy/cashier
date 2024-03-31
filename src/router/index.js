import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Home',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Home.vue'),
      children: [
        { path: '/member', name: 'member', component: () => import('../views/member/member.vue') },
        { path: '/orderlist', name: 'orderlist', component: () => import('../views/orderForm/orderList.vue') },
        { path: '/hire', name: 'hire', component: () => import('../views/hire/hire.vue') },
        { path: '/mys', name: 'mys', component: () => import('../views/mys/index.vue') },
      ],
    },
  ],
})

export default router
