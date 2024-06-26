<template>
    <div class="col-md-3">
      <div class="card">
        <img :src="product.prod_img" class="card-img-top" alt="Product Image">
        <div class="card-body">
          <h5 class="card-title">{{ product.prod_name }}</h5>
          <p class="card-text">{{ product.price }} 원</p>
          <p class="card-text">★{{ product.avg_score }} ({{ product.cnt }})</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* 여기에 필요한 스타일 추가 */
  </style>