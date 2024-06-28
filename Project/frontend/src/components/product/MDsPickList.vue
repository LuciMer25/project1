<template>
    <div>
      <h2>MD가 엄선한 상품입니다</h2>
      <swiper :slides-per-view="1" navigation pagination loop>
        <swiper-slide v-for="(product, index) in MDsPickProduct" :key="index">
          <h3 class="banner-title">{{ product.banner_title }}</h3>
          <img :src="`/api/upload/${product.banner_img}`" class="banner-img" alt="Product Image">
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
        MDsPickProduct: []
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
        } catch (error) {
          console.error('Error fetching MDs pick products:', error);
        }
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
  </style>