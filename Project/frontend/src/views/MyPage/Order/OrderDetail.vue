<template>
    <div class="container">
      <div class="order-details-wrapper">
        <h2 class="section-title">주문상세</h2>
        <div class="order-meta">
          <span v-if="orders.user.order_state === '상품준비중'">주문날짜: {{ formatDate(orders.user.order_date) }}</span>
          <template v-else-if="orders.user.order_state === '배송중' || orders.user.order_state === '배송완료'">
            <span>주문날짜: {{ formatDate(orders.user.order_date) }}</span><br />
            <span>운송장번호: {{ orders.user.waybill_no }}</span>
          </template>
          <template v-else-if="orders.user.order_state === '취소요청'">
            <span>취소요청 날짜: {{ formatDate(orders.user.cancel_req_date) }}</span>
          </template>
          <template v-else-if="orders.user.order_state === '취소완료'">
            <span>취소요청 날짜: {{ formatDate(orders.user.cancel_req_date) }}</span><br />
            <span>취소완료 날짜: {{ formatDate(orders.user.cancel_complete_date) }}</span>
          </template>
          <template v-else-if="orders.user.order_state === '반품요청'">
            <span>반품요청 날짜: {{ formatDate(orders.user.return_req_date) }}</span>
          </template>
          <template v-else-if="orders.user.order_state === '반품완료'">
            <span>반품요청 날짜: {{ formatDate(orders.user.return_req_date) }}</span><br />
            <span>반품완료 날짜: {{ formatDate(orders.user.return_complete_date) }}</span><br />
            <span>운송장번호: {{ orders.user.waybill_no }}</span>
          </template>
          <template v-else-if="orders.user.order_state === '구매확정'">
            <span>주문날짜: {{ formatDate(orders.user.order_date) }}</span><br />
            <span>구매확정 날짜: {{ formatDate(orders.user.buy_complete_date) }}</span><br />
            <span>운송장번호: {{ orders.user.waybill_no }}</span>
          </template>
        </div>
        <div class="orderBox" v-for="order in orders.product" :key="order.prod_no">
          <div class="order">
            <div class="order-details">
              <img class="prodImage" :src="`/api/upload/${order.prod_img}`" alt="상품 이미지">
              <div class="product-info">
                <div class="info">
                  <RouterLink :to="{ name: 'prodInfo', params: { no: order.prod_no } }" target="_blank">상품명 : {{ order.prod_name }}</RouterLink>
                  <span>{{ formatCurrency(order.price) }} 원 · {{ order.prod_cnt }} 개</span>
                  <span>상품 총 가격: {{ formatCurrency(order.order_amount) }} 원 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="recipient-details-wrapper">
        <h2 class="section-title">받는사람 정보</h2>
        <table class="info-table">
          <tbody>
            <tr>
              <th>받는사람</th>
              <td>{{ orders.user.name }}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{{ orders.user.phone_no }}</td>
            </tr>
            <tr>
              <th>받는주소</th>
              <td>({{ orders.user.post_no }}) {{ orders.user.addr }} {{ orders.user.detail_addr }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="payment-details-wrapper">
        <h2 class="section-title">결제 정보</h2>
        <table class="info-table">
          <tbody>
            <tr>
              <td>
                <div class="total-amount">
                  <strong>결제 방법</strong>
                  <strong>{{ orders.user.paytype }}</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="total-amount">
                  <strong>총 결제금액</strong>
                  <strong>{{ formatCurrency(orders.user.order_total_amount) }}원</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="back-button-wrapper">
        <RouterLink to="/admin/orderList" class="back-button">돌아가기</RouterLink>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: {
          product: [],
          user: {
            order_date: '',
            waybill_no: '',
            order_total_amount: '',
            name: '',
            phone_no: '',
            post_no: '',
            addr: '',
            detail_addr: '',
            paytype: '',
            cancel_req_date: '',
            cancel_complete_date: '',
            return_req_date: '',
            return_complete_date: '',
            buy_complete_date: '',
            order_state: ''
          }
        },
      };
    },
    async created() {
      const userId = sessionStorage.getItem('user_id');
      const no = this.$route.params.no;
      console.log(no);
      try {
        let productData = await axios.get(`/api/order/myPageOrderProdDetail/${no}`, {
          params: { user_id: userId }
        });
        this.orders.product = productData.data.list;
  
        let userData = await axios.get(`/api/order/myPageOrderUserDetail/${no}`, {
          params: { user_id: userId }
        });
        this.orders.user = userData.data;
        console.log(this.orders.user)
        console.log(orders.order_state)
  
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      formatDate(dateStr) {
        if (!dateStr) return '';
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
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .order-details-wrapper,
  .recipient-details-wrapper,
  .payment-details-wrapper {
    margin-bottom: 30px;
  }
  .section-title {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  .order-meta {
    margin-bottom: 20px;
  }
  .orderBox {
    margin-bottom: 20px;
  }
  .order-details {
    display: flex;
    align-items: center;
  }
  .prodImage {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .product-info .info {
    font-size: 18px;
  }
  .product-info .info span {
    display: block;
  }
  .info-table {
    width: 100%;
    border-collapse: collapse;
  }
  .info-table th,
  .info-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  .total-amount {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
  .back-button-wrapper {
    text-align: center;
  }
  .back-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  .back-button:hover {
    background-color: #0056b3;
  }
  </style>