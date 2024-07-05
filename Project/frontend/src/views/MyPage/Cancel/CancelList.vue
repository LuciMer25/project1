<template>
  <div class="col-md-9">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>상품이미지</th>
          <th>상품명</th>
          <th>가격</th>
          <th>주문상태</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(order, i) in paginatedOrders">
          <td @click="goToDetail">{{ order.order_no }}</td>
          <td>{{ order.first_prod_img }}</td>
          <td>{{ order.first_prod_name }}</td>
          <td>{{ formatCurrency(order.price) }}</td>
          <td>{{ order.order_state }}</td>
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
      searchNo: null,
      currentPage: 1,
      pageSize: 5,            // 한 페이지에 보여줄 주문 수
      maxDisplayedPages: 5    // 페이지네이션에서 최대로 보여질 페이지 수
    };
  },
  created() {
    // this.searchNo = this.$route.query.order_no;
    this.getcancelList();
  },
  methods: {
    async getcancelList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/cancel`, {
          params: {
            user_id: user.user_id
          }
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching cancel list:', error);
      }
    },
    formatCurrency(amount) {
      if (amount === undefined || amount === null) {
        return '0';
      }
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    changePage(page) {
      if (page < 1) page = 1;
      if (page > this.totalPages) page = this.totalPages;
      this.currentPage = page;
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.orders.length / this.pageSize);
    },
    visiblePages() {
      const pageCount = Math.ceil(this.orders.length / this.pageSize);
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
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.orders.slice(startIndex, endIndex);
    }
  }
};
</script>

<style scoped>
table * {
  text-align: center;
}
</style>
