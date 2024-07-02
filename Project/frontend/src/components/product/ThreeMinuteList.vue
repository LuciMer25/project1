<template>
    <div class="new-product-list">      
      <div class="section-header">
        <h4 class="section-title">3분이면 한 끼 뚝딱</h4>
        <div class="text-right mt-3 load-more">
          <v-btn @click="loadMore">더보기</v-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(product, index) in newProduct.slice(0, 4)" :key="index">
          <div class="card product-card">
            <img :src="product.prod_img" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
            <div class="card-body">
              <h5 class="card-title">{{ product.prod_name }}</h5>
              <p class="card-text">{{ product.price }} 원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'NewProductList',
    data(){
      return{
          newProduct : []
      }
    },
    created(){
      this.getnewProduct()
    },
    methods:{
      async getnewProduct() {
        let result = await axios.get(`/api/threeproduct`);
        this.newProduct = result.data;
      },
      loadMore(){
        this.$router.push({ path: "/threeproductlist" });
      },
      gotoDetail(no){
        this.$router.push(`product/${no}`);
      }
    },
  }
  </script>
  <style scoped>
  .new-product-list {
    padding: 20px;
    border-radius: 10px;
  }
  .section-header {
    display: flex;
    justify-content: space-between; /* h4와 버튼을 같은 라인에 배치 */
    align-items: center;
    margin-bottom: 10px;
  }
  .section-title {
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap; /* 줄바꿈 방지 */
  }
  .load-more {
    margin-top: 0; /* 기본적인 margin-top 제거 */
  }
  .product-card {
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    transition: box-shadow 0.3s;
  }
  .product-card:hover .card-img-top {
    transform: scale(1.05);
  }
  .card-body {
    text-align: left;
  }
  .position-relative {
    position: relative;
  }
  .rank-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    color: red;
    text-decoration: underline;
  }
  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 1rem;
    color: #333;
  }
  .card-img-top {
    transition: transform 0.3s;
    height: 200px;
    object-fit: cover;
  }
  </style>