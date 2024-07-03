<template>
  <div class="col-md-9">
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
        <tr :key="i" v-for="(order, i) in orders">
          <td @click="goToDetail">{{ order.order_no }}</td>
          <td>{{ order.first_prod_img }}</td>
          <td>{{ order.first_prod_name }}</td>
          <td>{{ order.price }}</td>
          <td>{{ order.addr }}</td>
          <td>{{ order.detail_addr }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.order_state }}</td>
          <td v-if="order.order_state === '상품준비중'">
            <button @click="cancelorder(order.order_no)">취소요청</button>
          </td>
          <td v-else-if="order.order_state === '배송완료'">
            <button @click="returnorder(order.order_no)">반품요청</button>
            <button @click="orderconfirm(order.order_no)">구매확정</button>
          </td>
          <td v-else-if="order.order_state === '취소요청'">
            <button @click="cancelrevoke(order.order_no)">취소</button>
          </td>
          <td v-else-if="order.order_state === '반품요청'">
            <button @click="returncancel(order.order_no)">취소</button>
          </td>
          <td v-else-if="order.order_state === '배송중'"></td>
          <td v-else-if="order.order_state === '취소완료'"></td>
          <td v-else-if="order.order_state === '반품완료'"></td>
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
    this.getorderList();
  },
  methods: {
    async getorderList() {
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
    async cancelorder(order_no) {
      this.searchNo = order_no;
      console.log(this.searchNo);
      try {
          await axios.put(`/api/Order/cancelOrder/${this.searchNo}`)
          .then(() => {
          alert("취소요청 되었습니다");
          this.$router.go(this.$router.currentRoute)
        });
      } catch (error) {
        console.log("실패", error);
        alert("실패");
      }
    },
    async returnorder(order_no) {
      this.searchNo = order_no;
      console.log(this.searchNo);
      try {
          await axios.put(`/api/Order/returnOrder/${this.searchNo}`)
          .then(() => {
          alert("반품요청 되었습니다");
          this.$router.go(this.$router.currentRoute)
        });
      } catch (error) {
        console.log("실패", error);
        alert("실패");
      }
    },
    async orderconfirm(order_no) {
      this.searchNo = order_no;
      console.log(this.searchNo);
      try {
          await axios.put(`/api/Order/orderConfirm/${this.searchNo}`)
          .then(() => {
          alert("구매확정 되었습니다");
          this.$router.go(this.$router.currentRoute)
        });
      } catch (error) {
        console.log("실패", error);
        alert("실패");
      }
    },
    async cancelrevoke(order_no) {
      this.searchNo = order_no;
      console.log(this.searchNo);
      try {
          await axios.put(`/api/Order/cancelRevoke/${this.searchNo}`)
          .then(() => {
          alert("요청이 취소되었습니다");
          this.$router.go(this.$router.currentRoute)
        });
      } catch (error) {
        console.log("실패", error);
        alert("실패");
      }
    },
    async returncancel(order_no) {
      this.searchNo = order_no;
      console.log(this.searchNo);
      try {
          await axios.put(`/api/Order/returnCancel/${this.searchNo}`)
          .then(() => {
          alert("요청이 취소되었습니다");
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
