<template>
  <v-container fluid>
    <v-breadcrumbs class="mb-4">
      <v-breadcrumbs-item>구매확정 현황</v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="mb-4">
      <v-card-title>
        <v-icon left>mdi-table</v-icon>
        구매확정 현황
      </v-card-title>
      <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          item-key="order_no"
          class="elevation-1"
        >
          <template v-slot:header.order_no>
            <th class="text-left">주문 번호</th>
          </template>
          <template v-slot:header.first_prod_name>
            <th class="text-left">상품명</th>
          </template>
          <template v-slot:header.user_id>
            <th class="text-left">주문자ID</th>
          </template>
          <template v-slot:header.addr>
            <th class="text-left">주소</th>
          </template>
          <template v-slot:header.detail_addr>
            <th class="text-left">상세주소</th>
          </template>
          <template v-slot:header.buy_complete_date>
            <th class="text-left">구매확정 날짜</th>
          </template>
          <template v-slot:header.order_state>
            <th class="text-left">주문상태</th>
          </template>

          <template v-slot:item.first_prod_name="{ item }">
            <span class="detailSpan" @click="goDetail(item.order_no)">
              {{ item.first_prod_name }} (외{{ item.prod_cnt }}건)
            </span>
          </template>
          <template v-slot:item.order_state="{ item }">
            <span>{{ item.order_state }}</span>
          </template>
          <template v-slot:item.buy_complete_date="{ item }">
            {{ formatDate(item.buy_complete_date) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      selectedStatus: null,
      completeOrderList: [],
      headers: [
        { text: 'order_no', value: 'order_no' },
        { text: 'first_prod_name', value: 'first_prod_name' },
        { text: 'user_id', value: 'user_id' },
        { text: 'addr', value: 'addr' },
        { text: 'detail_addr', value: 'detail_addr' },
        { text: 'buy_complete_date', value: 'buy_complete_date' },
        { text: 'order_state', value: 'order_state' },
      ],
      showModal: false,
      orderNo: null,
    };
  },
  created() {
    this.fetchCompleteList();
  },
  computed: {
    filteredItems() {
      return this.completeOrderList.filter((item) => {
        const search = this.search.toLowerCase();
        const matchesSearch = item.first_prod_name.toLowerCase().includes(search) || 
                              item.user_id.toLowerCase().includes(search) ||
                              item.order_no.toString().includes(search) ||
                              item.addr.toLowerCase().includes(search) ||
                              item.detail_addr.toLowerCase().includes(search) ||
                              this.formatDate(item.buy_complete_date).includes(search);
        return matchesSearch;
      });
    },
  },
  methods: {
    async fetchCompleteList() {
      try {
        const res = await axios.get('/api/adminOrder/completeOrder');
        this.completeOrderList = res.data.list;
      } catch (error) {
        console.error('Error fetching data', error);
      }
    },
    async refreshData() {
      await this.fetchCompleteList();
    },
    goDetail(order_no) {
      this.orderNo = order_no;
      this.$router.push(`completeDetail/${this.orderNo}`);
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
  },
};
</script>

<style scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}
.detailSpan,
.cancelSpan {
  cursor: pointer;
  color: blue;
}
.detailSpan:hover,
.cancelSpan:hover {
  text-decoration: underline;
}
</style>