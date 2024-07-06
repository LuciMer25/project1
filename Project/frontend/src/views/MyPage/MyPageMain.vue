<template>
  <div class="col-md-9">
    <section class="mp-info-wrap">
      <div class="mp-info" style="background-color: #f7f7f7;">
        <a href="https://www.ottogimall.co.kr/front/help/benefit" class="left">
          <img src="https://ottogi-mall-s3.s3.ap-northeast-2.amazonaws.com/data/grade/BfBuiDx2hDjqgQXGoaL.vbhdy7iolzdt.png" alt="블루">
        </a>
        <p class="right">
          <span class="name">{{ userId }}</span>님, 반갑습니다<br> 즐거운 쇼핑하세요!
        </p>
      </div>
    </section>
    <h3 class="title1">주문/배송조회</h3><hr>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품이미지</th>
            <th>상품명</th>
            <th>가격</th>
            <th>주소</th>
            <th>상세주소</th>
            <th>주문일자</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(order, i) in limitedOrders" @click="goToDetail(order.order_no)">
            <td>{{ order.order_no }}</td>
            <td><img :src="`/api/upload/products/${order.first_prod_img}`" alt="상품 이미지" width="50" height="50"></td>
            <td>{{ order.first_prod_name }}(외{{ order.prod_cnt }}건)</td>
            <td>{{ formatCurrency(order.price)+'원' }}</td>
            <td>{{ order.addr }}</td>
            <td>{{ order.detail_addr }}</td>
            <td>{{ formatDate(order.order_date) }}</td>
            <td>{{ order.order_state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="title2">상품후기</h3><hr>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>리뷰번호</th>
            <th>평점</th>
            <th>제목</th>
            <th>등록날짜</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="review.review_no" v-for="(review, index) in limitedReviews" @click="goToDetail(review.review_no)">
            <td>{{ review.review_no }}</td>
            <td>{{ review.score }}</td>
            <td>{{ review.review_title }}</td>
            <td>{{ formatDate(review.reg_date) }}</td>
            <td>{{ review.user_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="title3">위시리스트</h3><hr>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품이미지</th>
          <th>상품명</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(wish, index) in limitedWishList" :key="index">
          <td>
            <img :src="`/api/upload/products/${wish.prod_img}`" alt="상품 이미지" width="50" height="50">
          </td>
          <td>{{ wish.prod_name }}</td>
          <td>{{ formatCurrency(wish.price) + '원' }}</td>
        </tr>
      </tbody>
    </table>
    <h3 class="title4">1:1문의</h3><hr>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>문의번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="inquiry.inquiry_no" v-for="(inquiry, index) in limitedInquiryList" @click="goToDetail(inquiry.inquiry_no)">
            <td>{{ inquiry.inquiry_no }}</td>
            <td>{{ inquiry.inquiry_title }}</td>
            <td>{{ formatDate(inquiry.reg_date) }}</td>
            <td>{{ inquiry.comment_state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "",
      orders: [],
      reviewList: [],
      inquiryList: [],
      wishList: [],
    };
  },
  created() {
    this.userId = sessionStorage.getItem("user_id");
    this.getOrderList();
    this.getReviewList();
    this.getInquiryList();
    this.getWishList();
  },
  methods: {
    async getOrderList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        if(user != null){
          const response = await axios.get(`/api/order`, {
            params: {
              user_id: user.user_id,
            },
          });
          this.orders = response.data;
        }
        else{
          this.$swal.fire({
            title: '로그인이 필요한 서비스입니다',
            text: '로그인 페이지로 이동합니다.',
            icon: 'warning',
            confirmButtonColor: '#d33',
            confirmButtonText: '확인',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.replace('/login');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    },
    async getReviewList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/review`, {
          params: {
            user_id: user.user_id
          }
        });
        this.reviewList = response.data;
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    },
    async getInquiryList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/inquiry`, {
          params: {
            user_id: user.user_id
          }
        });
        this.inquiryList = response.data;
      } catch (error) {
        console.error('Error fetching inquiry list:', error);
      }
    },
    async getWishList() {
      const user = sessionStorage.getItem("user_id");
      console.log('유저정보:', user);
      const response = await axios.get(`/api/wishlist/wish/${user}`);
      this.wishList = response.data.list;
      console.log(this.wishList);
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    formatCurrency(amount) {
      if (!amount && amount !== 0) return '0';
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    goToDetail(order_no) {
      this.$router.push({ path: `/orderDetail/${order_no}` });
    },
  },
  computed: {
    limitedOrders() {
      return this.orders.slice(0, 3);
    },
    limitedReviews() {
      return this.reviewList.slice(0, 3);
    },
    limitedInquiryList() {
      return this.inquiryList.slice(0, 3);
    },
    limitedWishList() {
      return this.wishList.slice(0, 3);
    },
  },
};
</script>

<style scoped>
table * {
  text-align: center;
}
.mp-info-wrap {
  margin-bottom: 20px;
}

.mp-info {
  display: flex;
  align-items: center;
  padding: 20px;
}

.mp-info a.left {
  flex: 1;
  text-align: center;
  padding-left: 120px;
}

.mp-info p.right {
  flex: 3;
  text-align: left;
  padding-left: 200px;
  font-size: 16px;
  line-height: 24px;
}
</style>
