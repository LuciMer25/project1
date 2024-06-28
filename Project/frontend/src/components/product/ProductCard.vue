<template>
    <div class="col-md-3">
      <div class="card">
        <img :src="product.prod_img" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
        <div class="card-body">
          <h5 class="card-title">{{ product.prod_name }}</h5>
          <p class="card-text">{{ product.price }} 원</p>
          <p class="card-text">★{{ product.review_avg_score }} ({{ product.review_cnt }})</p>
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
    },
    methods : {
      gotoDetail(no){
        this.$router.push(`product/${no}`);
      }
    }
  };
  </script>
  

<style scoped>


</style>