<template>
  <div class="new-product-list">
    <h4 class="section-title">새로움을 맛보세요</h4>
    <div class="text-right mt-3 load-more">
      <button class="btn btn-outline-primary" @click="loadMore">더보기</button>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(product, index) in newProduct.slice(0, 4)" :key="index">
        <div class="card product-card">
          <img :src="`/api/upload/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
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
      let result = await axios.get(`/api/newproduct`);
      this.newProduct = result.data;
    },
    loadMore(){
      this.$router.push({ path: "/newproductlist" });
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
  background-color: #f9f9f9;
  border-radius: 10px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.load-more {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
.card-body{
  text-align : left;
}
</style>