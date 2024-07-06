<template>
    <v-container fluid>
      <v-breadcrumbs class="mb-4">
        <v-breadcrumbs-item>반품 현황</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mb-4">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          반품 현황
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
            <template v-slot:header.return_req_date>
              <th class="text-left">반품요청일자</th>
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
                v-if="item.order_state === '반품요청'"
                class="returnReq"
                @click="orderStateChange(item.order_no)"
              >
                {{ item.order_state }}
              </span>
              <span v-else-if="item.order_state === '반품완료'">
                {{ item.order_state }}
              </span>
              <span v-else>{{ item.order_state }}</span>
            </template>
            <template v-slot:item.return_req_date="{ item }">
              {{ formatDate(item.return_req_date) }}
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
        statuses: ['반품요청', '반품완료'],
        returnList: [],
        headers: [
          { text: 'order_no', value: 'order_no' },
          { text: 'first_prod_name', value: 'first_prod_name' },
          { text: 'waybill_no', value: 'waybill_no' },
          { text: 'user_id', value: 'user_id' },
          { text: 'addr', value: 'addr' },
          { text: 'detail_addr', value: 'detail_addr' },
          { text: 'return_req_date', value: 'return_req_date' },
          { text: 'order_state', value: 'order_state' },
        ],
      };
    },
    created() {
      this.fetchOrderList();
    },
    computed: {
      filteredItems() {
        return this.returnList.filter((item) => {
          const searchTerm = this.search.toLowerCase();
          const matchesSearch = item.first_prod_name.toLowerCase().includes(searchTerm) || item.user_id.toLowerCase().includes(searchTerm);
          const matchesStatus = this.selectedStatus ? item.order_state === this.selectedStatus : true;
          return matchesSearch && matchesStatus;
        });
      },
    },
    methods: {
      async fetchOrderList() {
        try {
          const res = await axios.get('/api/adminOrder/returnList');
          this.returnList = res.data.list;
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
          await axios.put(`/api/adminOrder/adminUpdateReturnState/${this.orderNo}`);
          this.$swal('반품완료 되었습니다.');
          await this.refreshData();
        } catch (error) {
          this.$swal('업데이트 실패');
          console.error('업데이트 실패', error);
        }
      },
      goDetail(order_no) {
        this.$router.push(`returnDetail/${order_no}`);
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
  .returnReq {
    cursor: pointer;
    color: blue;
  }
  .detailSpan:hover,
  .returnReq:hover {
    text-decoration: underline;
  }
  </style>