<template>
  <div class="col-md-9">
    <h3 class="title1">주문/배송조회</h3>
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
            <td><img :src="order.first_prod_img" alt="상품 이미지" width="50" height="50"></td>
            <td>{{ order.first_prod_name }}</td>
            <td>{{ formatCurrency(order.price) }}</td>
            <td>{{ order.addr }}</td>
            <td>{{ order.detail_addr }}</td>
            <td>{{ formatDate(order.order_date) }}</td>
            <td>{{ order.order_state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="title2">상품후기</h3>
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
            <tr
              :key="review.review_no"
              v-for="review in reviewList"
              @click="goToDetail(review.review_no)"
            >
              <td>{{ review.review_no }}</td>
              <td>{{ review.score }}</td>
              <td>{{ review.review_title }}</td>
              <td>{{ formatDate(review.reg_date) }}</td>
              <td>{{ review.user_id }}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <h3 class="title3">위시리스트</h3>
    <div>

    </div>
    <h3 class="title4">1:1문의</h3>
    <div>

    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      reviewList: [],
    };
  },
  created() {
    this.getOrderList();
    this.getReviewList();
  },
  methods: {
    async getOrderList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/order`, {
          params: {
            user_id: user.user_id,
          },
        });
        this.orders = response.data;
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
  },
};
</script>

<style scoped>
table * {
  text-align: center;
}
</style>
