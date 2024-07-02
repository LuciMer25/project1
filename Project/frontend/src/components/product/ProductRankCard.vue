<template>
  <div class="col-md-3">
    <div class="card">
      <div class="position-relative">
          <img :src="`/api/upload/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
          <span class="rank-badge">{{ rank + 1  }}</span> <!-- 순위 표시 -->
        </div>
      <div class="card-body">
        <h5 class="card-title">{{ product.prod_name }}</h5>
        <p class="card-text-price">{{ product.price }} 원</p>
        <p class="card-text-review">★{{ product.review_avg_score }} ({{ product.review_cnt }})</p>
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
    },
    rank : {
      type: Number,
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
.card-text-review {
  font-size : 15px;
  text-align : left;
}
.card-text-price{
  font-size : 30px;
  font-weight : 500;
  text-align : left;
}
.card-title{
  text-align : left;
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
color:red;
text-decoration: underline;
}
.card-body{
  text-align : left;
}
</style>
