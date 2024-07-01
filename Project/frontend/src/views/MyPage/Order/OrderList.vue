<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>상품명</th>
          <th>주문자ID</th>
          <th>주소</th>
          <th>상세주소</th>
          <th>주문상태</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(order, i) in orders">
          <td @click="goToDetail">{{ order.order_no }}</td>
          <td>{{ order.first_prod_name }}</td>
          <td>{{ order.user_id }}</td>
          <td>{{ order.addr }}</td>
          <td v-text="order.detail_addr"></td>
          <td>{{ order.reg_date }}</td>
          <td>{{ order.order_state }}</td>
          <td v-if="order.order_state === '상품준비중'">
            <button @click="cancelorder">취소요청</button>
          </td>
          <td v-else-if="order.order_state === '배송중'"></td>
          <td v-else>
            <button>반품요청</button>
            <button>구매확정</button>
          </td>
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
        orderNo: '',
        orders: [],
    //   orders: {order_no: '',
    //             order_total_amount: '',
    //             addr: '',
    //             order_state: '',
    //             waybill_no: '',
    //             post_no: '',
    //             detail_addr: '',
    //             user_id: '',
    //             pay_code: '',
    //             phone_no: '',
    //             name: '',
    //             paytype: '',
    //   },
    };
  },
  created() {
    this.searchNo = this.$route.query.order_no;
    this.getorderList();
  },
  methods: {
    async getorderList() {
      let result = await axios.get("/api/order");
      this.orders = result.data;
    },
    async cancelorder() {
      this.orderNo = this.$route.query.order_no;
      console.log(this.orderNo);
      try {
        await axios.put(`/api/order/${this.orderNo}`).then(() => {
          alert("취소요청 되었습니다");
          this.$router.go(this.$router.currentRoute)
        });
      } catch (error) {
        console.log("실패", error);
        alert("실패");
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
