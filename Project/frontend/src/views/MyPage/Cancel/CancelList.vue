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
          <tr :key="i" v-for="(order, i) in orders">
            <td @click="goToDetail">{{ order.order_no }}</td>
            <td>{{ order.first_prod_img }}</td>
            <td>{{ order.first_prod_name }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.order_state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        orders: [],
        searchNo: null
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
    },
  };
  </script>
  <style scoped>
  table * {
    text-align: center;
  }
  </style>
  