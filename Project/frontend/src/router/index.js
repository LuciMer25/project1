import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Main/HomeView.vue'
import MainLayout from '../layout/MainLayout.vue'
import MyPageLayout from '../layout/MyPageLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'

// 결제관련(정수범)
import OrderView from '../views/Main/Order/OrderView.vue'
import OrderCompleteView from '../views/Main/Order/OrderComplete.vue'
import ProductDetailView from '../views/Main/Order/ProductDetail.vue'
import CartView from '../views/Main/Cart/CartView.vue'

// 마이페이지 메인(맹)
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
// 리뷰(맹)
import ReviewList from '../views/MyPage/Review/ReviewList.vue'
import ReviewInfo from '../views/MyPage/Review/ReviewInfo.vue'
import ReviewForm from '../views/MyPage/Review/ReviewForm.vue'
import ReviewUpdate from '../views/MyPage/Review/ReviewUpdate.vue'
// 위시리스트(맹)
import WishList from '../views/MyPage/WishList/wishList.vue'
// 주문/배송(맹)
import OrderList from '../views/MyPage/Order/OrderList.vue'
// 취소/반품(맹)
import CancelList from '../views/MyPage/Cancel/CancelList.vue'
// 마이페이지 사이드바(삭제 예정)
import SideBar from '../views/MyPage/SideBar.vue'
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
import notifyList from '../views/Admin/AdminMember/notifyList.vue' 
import notifyInfo from '../views/Admin/AdminMember/notifyInfo.vue'
import adminNotify from '../views/Admin/AdminBoard/AdminNotify.vue'
import adminNotifyInfo from '../views/Admin/AdminBoard/AdminNotifyInfo.vue'
import adminNotifyInsert from '../views/Admin/AdminBoard/AdminNotifyInsert.vue'
import adminChart from '../views/Admin/AdminChart/AdminChart.vue'


// 상품
import NewProductlist from '../views/Main/NewProductListView.vue'
import BestProductlist from '../views/Main/BestProductListView.vue'
import ThreeProductlist from '../views/Main/ThreeProductListView.vue'
import CupbapProductlist from '../views/Main/CupbapProductListView.vue'
import CategoryToplist from '../views/Main/CategoryTopProductList.vue'
import CategoryBotList from '../views/Main/CategoryBotProductList.vue'


//로그인
import login from '../views/Main/login/login.vue'
import signtUp1 from '../views/Main/login/signup/signtUp1.vue'
import singUpList from '../views/Main/login/signup/singUpList.vue'
import kakaosingUp from '../views/Main/login/signup/kakaosingUp.vue'
//아이디 비밀번호 찾기
import FindIdPw from '../views/Main/login/FindIdPw.vue'

//회원정보수정
import MemCheck from '../views/MyPage/EditMember/MemCheck.vue'
import EditMembers from '../views/MyPage/EditMember/EditMembers.vue'
import DeleteMem from '../views/MyPage/EditMember/DeleteMem.vue'

//
import CategoryView from '../views/PageMove/CategoryView.vue'
import SearchView from '../views/PageMove/SearchView.vue'


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
      {
        path: 'cart',
        name: 'cart',
        component: CartView
      },
      // 카테고리 이름 임시 출력단
      {
        path: '/category',
        name: 'category',
        component: CategoryView
      },
      {
        path: '/search',
        component: SearchView
      },
      {
        path: '/category/:top_ctgr_no',
        name: 'CategoryList',
        component: CategoryBotList,
        props:true
      },
      {
        path: '/category/:top_ctgr_no/:ctgr_no',
        name: 'CategoryDetailList',
        component: CategoryBotList,
        props:true
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
        path: 'kakaosingUp',
        name: 'kakaosingUp',
        component : kakaosingUp
      },
      {
        path: 'singUpList',
        name: 'singUpList',
        component : singUpList
      },
      {
        path: '/DeleteMem',
        component: DeleteMem,
      },
      {
        path: 'FindIdPw',
        name: 'FindIdPw',
        component : FindIdPw
      },
      {
        path: 'FindIdPw',
        name: 'FindIdPw',
        component : FindIdPw
      },
      {
        path: 'notify',
        name: 'notify',
        component : notifyList
      },
      {
        path: 'notifyInfo/:no',
        name: 'notifyInfo',
        component : notifyInfo
      },

    ]
  },
  // 마이페이지
  {
    path: '/mypage',
    component: MyPageLayout,
    children: [
      // 마이페이지 메인
      {
        path: '',
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
      // 리뷰
      {
        path: '/ReviewList',
        component: ReviewList,
      },
      {
        path: '/ReviewForm',
        component: ReviewForm,
      },
      {
        path: '/ReviewInfo',
        component: ReviewInfo,
      },
      {
        path: '/ReviewUpdate',
        component: ReviewUpdate,
      },
      // 위시리스트
      {
        path: '/WishList',
        component: WishList,
      },
      // 주문/배송 조회
      {
        path: '/OrderList',
        component: OrderList,
      },
      // 취소/반품 조회
      {
        path: '/CancelList',
        component: CancelList,
      },
      // 마이페이지 사이드바테스트(삭제 예정)
      {
        path: '/SideBar',
        component: SideBar,
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
      {
        path: 'notify',
        component : adminNotify
      },
      {
        path: 'notifyInfo/:no',
        component : adminNotifyInfo
      },
      {
        path: 'notifyInsert',
        component : adminNotifyInsert
      },
      {
        path: 'adminChart',
        component : adminChart
      },

    ]
  },
  // 마이페이지
  {
    path: '/',
    component: MainLayout,
    children: [
      
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
