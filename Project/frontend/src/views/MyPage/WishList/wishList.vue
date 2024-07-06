<template>
  <div class="col-md-9">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품이미지</th>
          <th>상품명</th>
          <th>가격</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wish in wishList" :key="wish.wish_no">
          <td>
            <img :src="`/api/upload/products/${wish.prod_img}`" alt="상품 이미지" width="50" height="50">
          </td>
          <td><RouterLink :to="{ name: 'productInfo', params: { prodNo: wish.prod_no } }">상품명 : {{ wish.prod_name }}</RouterLink></td>
          <td>{{ formatCurrency(wish.price) + '원' }}</td>
          <td><button @click="deletebtn(wish.wish_no)">삭제</button></td>
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
      wishList: [],
    };
  },
  created() {
    this.getWishList();
  },
  methods: {
    async getWishList() {
      const user = sessionStorage.getItem("user_id");
      console.log('유저정보:', user);
      const response = await axios.get(`/api/wishlist/wish/${user}`);
      this.wishList = response.data.list;
      console.log(this.wishList);
    },
    formatCurrency(amount) {
      if (!amount && amount !== 0) return '0';
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async deletebtn(wishNo) {
      try {
        await axios.delete(`/api/wishlist/${wishNo}`);
        // alert('삭제되었습니다');
        this.getWishList(); // 위시리스트 갱신
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
      }
    },
    godetail(prod_no) {
      this.$router.push({ path: `/products/${wishList.prod_no}` });
    },
  },
};
</script>

<style scoped>
/* 스타일 추가 가능 */
</style>
