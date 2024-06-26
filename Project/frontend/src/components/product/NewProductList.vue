<template>
<hr>
  <div>
    <h4>신상품</h4>
    <div class="row">
        <div class="text-right mt-3">
          <button class="btn btn-outline-primary" @click="loadMore">더보기</button>
        </div>
        <div class="col-md-3" v-for="(product, index) in newProduct.slice(0, 4)" :key="index">
        <div class="card">
          <img :src="product.prod_img" class="card-img-top" alt="Product Image">
          <div class="card-body">
            <h5 class="card-title">{{ product.prod_name }}</h5>
            <p class="card-text">{{ product.price }} 원</p>
          </div>
        </div>
    </div>
    </div>
</div>
<hr>
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
      let result = await axios.get(`/api/product`);
      this.newProduct = result.data;
    },
    loadMore(){
      this.$router.push({ path: "/newproductlist" });
    }
  },
}
</script>
<style scoped>
h4 {
  margin-bottom: 20px;
}

.card {
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  max-height: 200px;
  object-fit: cover;
}

.card-body {
  text-align: center;
}

.btn-outline-primary {
  margin-top: 20px;
}
</style>