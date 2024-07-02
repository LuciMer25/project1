<template>
  <div class="banner">
    <h1 class="container">MD가 엄선한 상품입니다</h1>
    <!-- 타이틀 나열 -->
    <ul class="title-list">
      <li 
        v-for="(product, index) in MDsPickProduct" 
        :key="index" 
        @click="selectProduct(index)"
        :class="{ active: selectedProduct === product }"
      >
        {{ product.banner_title }}
      </li>
    </ul>
    <!-- Swiper 슬라이드 -->
    <swiper :slides-per-view="1" pagination loop>
      <swiper-slide v-for="(product, index) in filteredProducts" :key="index">
        <div class="product-card">
          <img :src="`/api/upload/${product.banner_img}`" class="banner-img" alt="Product Image">
          <div class="card-content">
            <h3 @click="gotoDetail(product.prod_no)"><a>상세보기</a></h3>
            <h5 class="card-title">{{ product.prod_name }}</h5>
            <p class="card-text">{{ product.price }} 원</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

export default {
  components: { Swiper, SwiperSlide },
  name: 'MDsPickList',
  data() {
    return {
      MDsPickProduct: [],
      selectedProduct: {}
    };
  },
  created() {
    this.getMDsPickProduct();
  },
  methods: {
    async getMDsPickProduct() {
      try {
        let result = await axios.get(`/api/banner`);
        this.MDsPickProduct = result.data;
        // 초기 선택된 제품 설정
        if (this.MDsPickProduct.length > 0) {
          this.selectedProduct = this.MDsPickProduct[0];
        }
      } catch (error) {
        console.error('Error fetching MDs pick products:', error);
      }
    },
    selectProduct(index) {
      this.selectedProduct = this.MDsPickProduct[index];
    },
    gotoDetail(no) {
      this.$router.push(`/product/${no}`);
    }
  },
  computed: {
    filteredProducts() {
      return this.MDsPickProduct.filter(product => product === this.selectedProduct);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}
.banner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.banner-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.product-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.banner-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}

.card-content {
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  color: black;
  text-align: center;
}

.title-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 20px;
}

.title-list li {
  cursor: pointer;
  padding: 15px 25px;
  margin-right: 10px;
  text-align: center;
  white-space: nowrap;
  transition: background-color 0.3s, font-weight 0.3s;
}

.title-list li.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
