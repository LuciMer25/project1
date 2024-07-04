<template>
    <div class="col-md-3">
      <div class="card">
        <img :src="`/api/upload/products/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
        <div class="card-body">
          <h5 class="card-title">{{ product.prod_name }}</h5>
          <p class="card-text">{{ product.price }} 원</p>
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
.fixed-card {
  width: 250px; /* 카드의 너비를 고정 */
  height: 400px; /* 카드의 높이를 고정 */
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  display: flex;
  flex-direction: column;
}

.fixed-card .card-img-top {
  height: 150px; /* 이미지의 높이를 고정 */
  object-fit: cover; /* 이미지를 고정된 영역에 맞추기 */
}

.fixed-card .card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fixed-card .card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.fixed-card .card-text {
  margin-bottom: 0.5rem;
}
.card-body{
  text-align : left;
}
</style>