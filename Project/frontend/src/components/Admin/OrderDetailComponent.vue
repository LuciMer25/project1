<template>
  <div class="container">
    <div class="order-details-wrapper">
      <h2 class="section-title">주문상세</h2>
      <span>주문날짜: {{ data.user.order_date }}</span><br />
      <span>운송장번호: {{ data.user.waybill_no }}</span>

      <div class="orderBox" v-for="order in data.product" :key="order.id">
        <div class="order">
          <div class="order-details">
            <img class="prodImage" :src="`/api/upload/${order.prod_img}`" alt="상품 이미지">
            <div class="product-info">
              <div class="info">
                <a href="#" target="_blank">상품명: {{ order.prod_name }}</a>
                <span>{{ order.price }} 원 · {{ order.prod_cnt }} 개</span>
                <span>상품 총 가격: {{ order.order_amount }} 원 </span>
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
            <td>{{ data.user.name }}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{{ data.user.phone_no }}</td>
          </tr>
          <tr>
            <th>받는주소</th>
            <td>({{ data.user.post_no }}) {{ data.user.addr }} {{ data.user.detail_addr }}</td>
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
                <strong>총 결제금액</strong>
                <strong>{{ data.user.order_total_amount }}원</strong>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="back-button-wrapper">
      <button class="back-button">
        <RouterLink to="/admin/orderList">돌아가기</RouterLink>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        product: [],
        user: {
          order_date: '',
          waybill_no: '',
          order_total_amount: '',
          name: '',
          phone_no: '',
          post_no: '',
          addr: '',
          detail_addr: ''
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.orderBox {
  margin-bottom: 20px;
}

.order {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
}

.order-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prodImage {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 5px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-info .info a {
  text-decoration: none;
  color: #346aff;
  font-size: 1rem;
  margin-bottom: 5px;
}

.product-info .info span {
  color: #555;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.info-table th, .info-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.info-table th {
  background-color: #f9f9f9;
  color: #333;
}

.total-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.back-button-wrapper {
  text-align: right;
}

.back-button {
  background-color: #346aff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
}

.back-button a {
  color: #fff;
  text-decoration: none;
}

.back-button:hover {
  background-color: #265ac1;
}
</style>