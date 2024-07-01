import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main/HomeView.vue'
import MainLayout from '../layout/MainLayout.vue'
import MyPageLayout from '../layout/MyPageLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'

// 결제관련(정수범)
import OrderView from '../views/Main/Order/OrderView.vue'
import OrderCompleteView from '../views/Main/Order/OrderComplete.vue'
import ProductDetailView from '../views/Main/Order/ProductDetail.vue'



// 마이페이지 메인
import MyPageMain from '../views/MyPage/MyPageMain.vue'
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
import adminProdUpdate from '../views/Admin/AdminProduct/AdminProdUpdate.vue'
import adminOrderDetail from '../views/Admin/AdminOrder/AdminOrderDetail.vue'
import adminCancelDetail from '../views/Admin/AdminOrder/AdminCancelDetail.vue'
import adminReturnDetail from '../views/Admin/AdminOrder/AdminReturnDetail.vue'
import adminQnaInfo from '../views/Admin/AdminMember/AdminQnaInfo.vue'
import adminInquiryInfo from '../views/Admin/AdminMember/AdminInquiryInfo.vue'

// 상품
import NewProductlist from '../views/Main/NewProductListView.vue'
import BestProductlist from '../views/Main/BestProductListView.vue'
import ThreeProductlist from '../views/Main/ThreeProductListView.vue'
import CupbapProductlist from '../views/Main/CupbapProductListView.vue'


//로그인
import login from '../views/Main/login/login.vue'
import signtUp1 from '../views/Main/login/signup/signtUp1.vue'
import singUpList from '../views/Main/login/signup/singUpList.vue'
//아이디 비밀번호 찾기
import FindIdPw from '../views/Main/login/FindIdPw.vue'

//회원정보수정
import MemCheck from '../views/MyPage/EditMember/MemCheck.vue'
import EditMembers from '../views/MyPage/EditMember/EditMembers.vue'
import DeleteMem from '../views/MyPage/EditMember/DeleteMem.vue'


//
import CategoryView from '../views/CategoryView.vue'

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
      // 결제
      {
        path: 'order',
        name: 'order',
        component: OrderView
      },
      // 결제완료
      {
        path: 'ordercomplete/:orderNo',
        name: 'ordercomplete',
        component: OrderCompleteView
      },
      // 상품상세
      {
        path: 'product/:prodNo',
        name: 'productInfo',
        component: ProductDetailView
      },
      // 카테고리 이름 임시 출력단
      {
        path: '/category',
        name: 'category',
        component: CategoryView
      },
      // 메인화면 신상품 리스트
      {
        path: 'newproductlist',
        name: 'NewProductlist',
        component : NewProductlist
      },
      // 메인화면 BEST 상품 리스트
      {
        path: 'bestproductlist',
        name: 'BestProductlist',
        component : BestProductlist
      },
      // 3분요리 상품 리스트
      {
        path: 'threeproductlist',
        name: 'ThreeProductlist',
        component : ThreeProductlist
      },
      // 컵밥 상품 리스트
      {
        path: 'cupbapproductlist',
        name: 'CupbapProductlist',
        component : CupbapProductlist
      },
      //로그인
      {
        path: 'login',
        name: 'login',
        component : login
      },
      {
        path: 'signtUp1',
        name: 'signtUp1',
        component : signtUp1
      },
      {
        path: 'singUpList',
        name: 'singUpList',
        component : singUpList
      },
    {
      path: 'FindIdPw',
      name: 'FindIdPw',
      component : FindIdPw
    },

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
        path: 'prodInfo/:no',
        name: 'prodInfo',
        component: adminProdInfo
      },
      {
        path: 'memberList',
        name: 'memberList',
        component: adminMember
      },
      {
        path: 'qnaList',
        name: 'qnaList',
        component: adminQnA
      },
      {
        path: 'inquiry',
        name: 'inquiry',
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
      {
        path: 'prodUpdate/:no',
        component : adminProdUpdate
      },
      {
        path: 'cancelDetail/:no',
        component : adminCancelDetail
      },
      {
        path: 'orderDetail/:no',
        component : adminOrderDetail
      },
      {
        path: 'returnDetail/:no',
        component : adminReturnDetail
      },
      {
        path: 'qnaInfo/:no',
        component : adminQnaInfo
      },
      {
        path: 'inquiryInfo/:no',
        component : adminInquiryInfo
      },

    ]
  },
  // 마이페이지
  {
    path: '/',
    component: MainLayout,
    children: [
      // 마이페이지 메인
      {
        path: '/mypagemain',
        component: MyPageMain,
      },
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
      //회원수정페이지
      {
        path: '/MemCheck',
        component: MemCheck,
      },
      {
        path: '/EditMembers',
        component: EditMembers,
      },
      {
        path: '/DeleteMem',
        component: DeleteMem,
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
