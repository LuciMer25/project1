<template>
    <div class="container">
      <h2>BEST</h2>
      <div class="row">
      <ProductRankCard v-for="(product, index) in newProduct" :key="index" :product="product" :rank="index"/>
      </div>
    </div>
  </template>
     
     <script>
     import axios from 'axios';
     import ProductRankCard from "../../components/product/ProductRankCard.vue";
  
     export default {
       components:{
         ProductRankCard
       },
       data(){
         return{
             newProduct : [],

         }
       },
       created() {
         this.getNewProduct();
       },
       methods: {
           async getNewProduct()   {
           try {
             let result = await axios.get(`/api/bestproduct`);
             this.newProduct = result.data;
             this.newProductSorted = [...this.newProduct]; // 정렬된 배열 초기화
           } catch (error) {
             console.error('Error fetching new products:', error);
           }
         }
     }
     }
     </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
    text-align: center;

  }
  
  h2 {
    text-align: left;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .row {
    margin-bottom: 20px;
  }
  
  .text-right {
    text-align: right;
  }
  .paging{
  margin: 0 auto; /* 가운데 정렬 */
  display: inline-block; /* 블록 요소를 인라인 블록으로 변환하여 좌우 마진을 자동으로 설정할 수 있도록 함 */
  margin-top: 20px; /* 필요한 경우 위 여백 추가 */
}
  .btn-outline-primary {
    margin-top: 20px;
  }
  </style>