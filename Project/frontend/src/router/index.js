import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main/HomeView.vue'
import MainLayout from '../layout/MainLayout.vue'
import MyPageLayout from '../layout/MyPageLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'
import OrderView from '../views/Main/Order/OrderView.vue'
// 문의페이지
import InquiryList from '../views/MyPage/Inquiry/InquiryList.vue'
import InquiryInfo from '../views/MyPage/Inquiry/InquiryInfo.vue'
import InquiryForm from '../views/MyPage/Inquiry/InquiryForm.vue'
import InquiryUpdate from '../views/MyPage/Inquiry/InquiryUpdate.vue'
// QnA페이지
import QnAList from '../views/MyPage/QnA/QnAList.vue'
import QnAInfo from '../views/MyPage/QnA/QnAInfo.vue'
import QnAForm from '../views/MyPage/QnA/QnAForm.vue'
import QnAUpdate from '../views/MyPage/QnA/QnAUpdate.vue'
//관리자
import adminMain from '../views/Admin/AdimMain.vue'
import adminProdList from '../views/Admin/AdminProduct/AdminProdList.vue'
import adminProdInsert from '../views/Admin/AdminProduct/AdminProdInsert.vue'
import adminProdInfo from '../views/Admin/AdminProduct/AdminProdInfo.vue'
import adminMember from '../views/Admin/AdminMember/AdminMember.vue'
import adminInquiry from '../views/Admin/AdminMember/AdminInquiry.vue'
import adminQnA from '../views/Admin/AdminMember/AdminQnA.vue'
import adminOrderList from '../views/Admin/AdminOrder/AdminOrderList.vue'
import adminCancelOrder from '../views/Admin/AdminOrder/AdminCancelOrder.vue'
import adminReturnOrder from '../views/Admin/AdminOrder/AdminReturnOrder.vue'

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
      {
        path: 'orderList',
        component : adminOrderList
      },
      {
        path: 'cancelList',
        component : adminCancelOrder
      },
      {
        path: 'returnList',
        component : adminReturnOrder
      },
      
    ]
  },
  // 마이페이지
  {
    path: '/',
    component: MainLayout,
    children: [
      // 문의페이지
      {
        path: '/inquiryList',
        component: InquiryList,
      },
      {
        path: '/inquiryInfo',
        component: InquiryInfo,
      },
      {
        path: '/inquiryForm',
        component: InquiryForm,
      },
      {
        path: '/inquiryUpdate',
        component: InquiryUpdate,
      },
      // QnA
      {
        path: '/QnAList',
        component: QnAList,
      },
      {
        path: '/QnAInfo',
        component: QnAInfo,
      },
      {
        path: '/QnAForm',
        component: QnAForm,
      },
      {
        path: '/QnAUpdate',
        component: QnAUpdate,
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
