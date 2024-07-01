<template>
  <div>
    <h2>MD가 엄선한 상품입니다</h2>
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
      <swiper-slide>
        <h3 class="banner-title">{{ selectedProduct.banner_title }}</h3>
        <img :src="`/api/upload/${selectedProduct.banner_img}`" class="banner-img" alt="Product Image">
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
  }
};
</script>

<style scoped>
.banner-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.banner-img {
  width: 800px;
  height: auto;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.title-list {
  list-style-type: none;
  padding: 0;
  display: flex; /* 가로로 배치하기 위해 flex 사용 */
  overflow-x: auto; /* 가로 스크롤 가능하도록 설정 */
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
}

.title-list li {
  cursor: pointer;
  padding: 10px 20px; /* 가로로 padding을 추가하여 공간 확보 */
  margin-right: 5px;
  text-align: center;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  transition: background-color 0.3s, font-weight 0.3s; /* 스타일 변경 시 애니메이션 추가 */
}


.title-list li.active {
  font-weight: bold; /* 글씨 굵게 */
  text-decoration : underline;
}
</style>