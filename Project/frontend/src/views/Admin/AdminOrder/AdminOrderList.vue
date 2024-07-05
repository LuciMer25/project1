<template>
    <v-container fluid>
      <v-breadcrumbs class="mb-4">
        <v-breadcrumbs-item>주문 현황</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mb-4">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          주문 현황
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedStatus"
                :items="statuses"
                label="주문 상태 선택"
                single-line
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            item-key="order_no"
            class="elevation-1"
          >
            <template v-slot:header.order_no>
              <th class="text-left">주문 번호</th>
            </template>
            <template v-slot:header.first_prod_name>
              <th class="text-left">상품명</th>
            </template>
            <template v-slot:header.waybill_no>
              <th class="text-left">운송장번호</th>
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
            <template v-slot:header.order_date>
              <th class="text-left">주문일자</th>
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
              <span
                v-if="item.order_state === '상품준비중'"
                class="modalSpan"
                @click="openModal(item.order_no)"
              >
                {{ item.order_state }}
              </span>
              <span
                v-else-if="item.order_state === '배송중'"
                class="stateSpan"
                @click="orderStateChange(item.order_no)"
              >
                {{ item.order_state }}
              </span>
              <span v-else>{{ item.order_state }}</span>
            </template>
            <template v-slot:item.order_date="{ item }">
              {{ formatDate(item.order_date) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <Modal v-if="showModal" :orderNo="orderNo" @close="closeModal" @refresh ="refreshData" />
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Modal from '@/components/Admin/waybill.vue';
  
  export default {
    components: {
      Modal
    },
    data() {
      return {
        search: '',
        selectedStatus: null,
        statuses: ['상품준비중', '배송중', '배송완료'],
        orderAllList: [],
        headers: [
          { text: 'order_no', value: 'order_no' },
          { text: 'first_prod_name', value: 'first_prod_name' },
          { text: 'waybill_no', value: 'waybill_no' },
          { text: 'user_id', value: 'user_id' },
          { text: 'addr', value: 'addr' },
          { text: 'detail_addr', value: 'detail_addr' },
          { text: 'order_date', value: 'order_date' },
          { text: 'order_state', value: 'order_state' },
        ],
        showModal: false,
        orderNo: null,
      };
    },
    created() {
      this.fetchOrderList();
    },
    computed: {
      filteredItems() {
        return this.orderAllList.filter((item) => {
          const matchesSearch = item.first_prod_name.includes(this.search) || item.user_id.includes(this.search);
          const matchesStatus = this.selectedStatus ? item.order_state === this.selectedStatus : true;
          return matchesSearch && matchesStatus;
        });
      },
    },
    methods: {
      async fetchOrderList() {
        try {
          const res = await axios.get('/api/adminOrder/orderAllList');
          this.orderAllList = res.data.list;
        } catch (error) {
          console.error('Error fetching data', error);
        }
      },
      async refreshData() {
        await this.fetchOrderList();
      },
      async orderStateChange(order_no) {
        this.orderNo = order_no;
        try {
          await axios.put(`/api/adminOrder/updateOrderState/${this.orderNo}`);
          this.$swal('배송완료 되었습니다.');
          await this.refreshData();
        } catch (error) {
          this.$swal('업데이트 실패');
          console.error('업데이트 실패', error);
        }
      },
      openModal(order_no) {
        this.orderNo = order_no;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.orderNo = null;
      },
      goDetail(order_no) {
        this.$router.push(`orderDetail/${order_no}`);
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
  .modalSpan,
  .stateSpan {
    cursor: pointer;
    color: blue;
  }
  .detailSpan:hover,
  .modalSpan:hover,
  .stateSpan:hover {
    text-decoration: underline;
  }
  </style>