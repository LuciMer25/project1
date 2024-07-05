<template>
    <div class="mainstart">
    <div class="mainstart-content">
      <h1>WELCOME TO YEDAM MALL!</h1>
      <p>Explore the latest trends and products</p>
    </div>
  </div>

  <div class="container">
    <NewProductList />
  </div>
  <div class="container">
    <BestSellList />
  </div>
  <div class="container">
    <ThreeMinuteList />
  </div>
  <div class="container">
    <CupbapList />
  </div>
  <div class="banner">
    <MDsPickList />
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import NewProductList from "../../components/product/NewProductList.vue";
import BestSellList from "../../components/product/BestSellList.vue";
import ThreeMinuteList from "../../components/product/ThreeMinuteList.vue";
import CupbapList from "../../components/product/CupbapList.vue";
import MDsPickList from "../../components/product/MDsPickList.vue";
export default {
  name: 'HomeView',
  components: {
    NewProductList,
    BestSellList,
    ThreeMinuteList,
    CupbapList,
    MDsPickList
  },
  methods:{
    gotoOrderPage(){

      let array = [
      { prod_no: 1, prod_name: "진라면 매운맛 (120GX5)", prod_cnt: 3, price:3580, order_amount: 10740, prod_img: "test.png" },
      { prod_no: 2, prod_name: "열라면 (120GX5)", prod_cnt: 1, price: 3580, order_amount: 3580, prod_img: "test.png" },
      { prod_no: 3, prod_name: "진라면 순한맛 (120GX5)", prod_cnt: 4, price: 3580, order_amount: 14320, prod_img: "test.png" },

      ];
      this.$store.dispatch('updateItemList', array);
      this.$router.push({ name: 'order' });
    },
    gotoProductPage(){
      this.$router.push(`product/1`);
    }
  }
}
</script>

<style>
        body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
    }
    .mainstart {
      position: relative;
      height: 600px; /* 배너 높이 증가 */
      background-image: url('https://source.unsplash.com/random/1600x900'); /* 배경 이미지 */
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #fff;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .mainstart::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)); /* 그라데이션 배경 */
      z-index: 1;
    }
    .mainstart-content {
      position: relative;
      z-index: 2;
    }
    .mainstart h1 {
      font-size: 5rem; /* 폰트 크기 증가 */
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      line-height: 1.2; /* 줄 간격 조정 */
    }
    .mainstart p {
      font-size: 2rem; /* 부제목 폰트 크기 */
    }


.banner {
  background-color : black;
}

</style>

