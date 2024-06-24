import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main/HomeView.vue'
import MainLayout from '../layout/AdminLayout.vue'
import MyPageLayout from '../layout/MyPageLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'

//관리자
import adminMain from '../views/Admin/AdimMain.vue'
import adminProdList from '../views/Admin/AdminProduct/AdminProdList.vue'
import adminProdInsert from '../views/Admin/AdminProduct/AdminProdInsert.vue'
import adminProdInfo from '../views/Admin/AdminProduct/AdminProdInfo.vue'
import adminMember from '../views/Admin/AdminMember/AdminMember.vue'
import adminInquiry from '../views/Admin/AdminMember/AdminInquiry.vue'
import adminQnA from '../views/Admin/AdminMember/AdminQnA.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children : [
      {
        path: '',
        name: 'home',
        component: HomeView
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
    children: [
      {
        path: '',
        component: adminMain
      },
      {
        path: 'prodList',
        name : 'prodList',
        component: adminProdList
      },
      {
        path: 'prodInsert',
        name: 'prodInsert',
        component: adminProdInsert
      },
      {
        path: 'prodInfo',
        name: 'prodInfo',
        component: adminProdInfo
      },
      {
        path: 'memberList',
        path: 'memberList',
        component: adminMember
      },
      {
        path: 'qnaList',
        path: 'qnaList',
        component: adminQnA
      },
      {
        path: 'inquiry',
        path: 'inquiry',
        component: adminInquiry
      },
      
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router