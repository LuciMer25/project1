<template>
    <div>메인시작화면</div>
  <button @click="gotoOrderPage">결제 테스트</button>

  <div class="container">
    <NewProductList />
  </div>
  
</template>

<script>
// @ is an alias to /src

import NewProductList from "../../components/product/NewProductList.vue";
export default {
  name: 'HomeView',
  components: {NewProductList},
  methods:{
    gotoOrderPage(){

      let array = [
      { prod_no: 1, prod_name: "진라면 매운맛 (120GX5)", prod_cnt: 3, price:3580, order_amount: 10740, prod_img: "test.png" },
      { prod_no: 2, prod_name: "열라면 (120GX5)", prod_cnt: 1, price: 3580, order_amount: 3580, prod_img: "test.png" },
      { prod_no: 3, prod_name: "진라면 순한맛 (120GX5)", prod_cnt: 4, price: 3580, order_amount: 14320, prod_img: "test.png" },

      ];
      this.$store.dispatch('updateItemList', array);
      this.$router.push({ name: 'order' });
    }
  }
}
</script>