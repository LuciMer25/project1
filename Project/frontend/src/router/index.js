import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main/HomeView.vue'
import MainLayout from '../layout/AdminLayout.vue'
import MyPageLayout from '../layout/MyPageLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'
import OrderView from '../views/Main/Order/OrderView.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children : [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'order',
        name: 'order',
        component: OrderView
      }
    ]
  },
  {
    path: '/mypage',
    component: MyPageLayout,
  },
  {
    path: '/admin',
    component: AdminLayout,
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
