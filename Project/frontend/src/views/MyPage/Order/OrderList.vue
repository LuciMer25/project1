<template>
  <div class="col-md-9">
    <h3 style="font-weight: bold">주문/배송 조회</h3>
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
          <th>취소/반품/구매확정</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, i) in processedOrders" :key="i">
          <td>{{ order.order_no }}</td>
          <td><img :src="`/api/upload/products/${order.first_prod_img}`" alt="상품 이미지" style="width: 50px; height: 50px;"></td>
          <td  @click="goToDetail(order.order_no)">{{ order.first_prod_name }}(외{{ order.prod_cnt - 1 }}건)</td>
          <td>{{ formatCurrency(order.order_total_amount) }}</td>
          <td>{{ order.addr }}</td>
          <td>{{ order.detail_addr }}</td>
          <td>{{ formatDate(order.order_date) }}</td>
          <td>{{ order.order_state }}</td>
          <td v-if="order.order_state === '상품준비중'">
            <button @click="cancelOrder(order.order_no)">취소요청</button>
          </td>
          <td v-else-if="order.order_state === '배송완료'">
            <button @click="returnOrder(order.order_no)">반품요청</button>
            <button @click="orderConfirm(order.order_no)">구매확정</button>
          </td>
          <td v-else-if="order.order_state === '취소요청'">
            <button @click="cancelRevoke(order.order_no)">취소</button>
          </td>
          <td v-else-if="order.order_state === '반품요청'">
            <button @click="returnCancel(order.order_no)">취소</button>
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click="changePage(currentPage - 1)">이전</a>
      </li>
      <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <a class="page-link" @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" @click="changePage(currentPage + 1)">다음</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      currentPage: 1,
      pageSize: 5,            // 한 페이지에 보여줄 주문 수
      maxDisplayedPages: 5    // 페이지네이션에서 최대로 보여질 페이지 수
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/order`, {
          params: {
            user_id: user.user_id
          }
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    },
    async cancelOrder(order_no) {
      try {
        await axios.put(`/api/Order/cancelOrder/${order_no}`);
        this.$swal("취소요청 되었습니다");
        this.getOrderList(); // 목록 다시 불러오기
      } catch (error) {
        console.error("Failed to cancel order:", error);
        this.$swal("취소요청 실패");
      }
    },
    async returnOrder(order_no) {
      try {
        await axios.put(`/api/Order/returnOrder/${order_no}`);
        this.$swal("반품요청 되었습니다");
        this.getOrderList(); // 목록 다시 불러오기
      } catch (error) {
        console.error("Failed to request return:", error);
        this.$swal("반품요청 실패");
      }
    },
    async orderConfirm(order_no) {
      try {
        await axios.put(`/api/Order/orderConfirm/${order_no}`);
        this.$swal("구매확정 되었습니다");
        this.getOrderList(); // 목록 다시 불러오기
      } catch (error) {
        console.error("Failed to confirm order:", error);
        this.$swal("구매확정 실패");
      }
    },
    async cancelRevoke(order_no) {
      try {
        await axios.put(`/api/Order/cancelRevoke/${order_no}`);
        this.$swal("요청이 취소되었습니다");
        this.getOrderList(); // 목록 다시 불러오기
      } catch (error) {
        console.error("Failed to revoke cancellation:", error);
        this.$swal("취소요청 취소 실패");
      }
    },
    async returnCancel(order_no) {
      try {
        await axios.put(`/api/Order/returnCancel/${order_no}`);
        this.$swal("요청이 취소되었습니다");
        this.getOrderList(); // 목록 다시 불러오기
      } catch (error) {
        console.error("Failed to cancel return request:", error);
        this.$swal("반품요청 취소 실패");
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
    changePage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.processedOrders.length / this.pageSize);
    },
    visiblePages() {
      const pageCount = Math.ceil(this.processedOrders.length / this.pageSize);
      let startPage = Math.max(1, this.currentPage - Math.floor(this.maxDisplayedPages / 2));
      let endPage = Math.min(startPage + this.maxDisplayedPages - 1, pageCount);

      startPage = Math.max(1, endPage - this.maxDisplayedPages + 1);
      endPage = Math.min(pageCount, startPage + this.maxDisplayedPages - 1);

      const pages = [];
      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }
      return pages;
    },
    processedOrders() {
      const map = new Map();
      this.orders.forEach(order => {
        if (!map.has(order.order_no)) {
          map.set(order.order_no, { ...order, prod_cnt: 1 });
        } else {
          const existingOrder = map.get(order.order_no);
          existingOrder.prod_cnt++;
          map.set(order.order_no, existingOrder);
        }
      });
      return Array.from(map.values());
    },
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.processedOrders.slice(startIndex, endIndex);
    }
  }
};
</script>

<style scoped>
table * {
  text-align: center;
  font-size: 14px;
}

.col-md-9{
  margin-top: 40px;
  width: 75%;
}
</style>
