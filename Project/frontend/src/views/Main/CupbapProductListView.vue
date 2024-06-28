<template>
    <div class="container">
      <h4>7일간 BEST</h4>
      <CategoryContent :productsCount="newProduct.length" :itemsPerPage="itemsPerPage" @sort="sortProducts" @update-items-per-page="updateItemsPerPage"/>
      <div class="row">
      <ProductCard v-for="(product, index) in paginatedProducts" :key="index" :product="product" :rank="index"/>
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
      />
    </div>
  </template>
     
     <script>
     import axios from 'axios';
     import CategoryContent from "../../components/product/CategoryContent.vue";
     import ProductCard from "../../components/product/ProductCard.vue";
     import Pagination from "../../components/Pagination.vue";
  
     export default {
       components:{
         CategoryContent,
         ProductCard,
         Pagination
       },
       data(){
         return{
             newProduct : [],
             newProductSorted : [],
             itemsPerPage: 8,
             currentPage: 1
         }
       },
       created() {
         this.getNewProduct();
       },
       computed : {
            totalPages() {
            return Math.ceil(this.newProductSorted.length / this.itemsPerPage);
            },
            paginatedProducts() {
              const start = (this.currentPage - 1) * this.itemsPerPage;
              const end = start + this.itemsPerPage;
              return this.newProductSorted.slice(start, end);
            }
       },
       methods: {
          
           async getNewProduct()   {
           try {
             let result = await axios.get(`/api/cupbapproduct`);
             this.newProduct = result.data;
             this.newProductSorted = [...this.newProduct]; // 정렬된 배열 초기화
           } catch (error) {
             console.error('Error fetching new products:', error);
           }
         },
         sortProducts(type) {
           switch (type) {
             case 'popularity':
               // 인기 순으로 정렬
               this.newProductSorted.sort((a, b) => {
                 // 1차 정렬: score가 높은 순서대로 정렬
                 if (a.review_avg_score > b.review_avg_score) return -1;
                 if (a.review_avg_score < b.review_avg_score) return 1;
     
                 // 2차 정렬: score가 같다면 리뷰 개수가 많은 순서대로 정렬
                 if (a.review_cnt > b.review_cnt) return -1;
                 if (a.review_cnt < b.review_cnt) return 1;
  
                return 0;});          
               break;
             case 'new':
               // 신제품 순으로 정렬  
               this.newProductSorted.sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date));
               break;
               // 오래된 순으로 정렬
             case 'old':
               this.newProductSorted.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));
               break;
             case 'lowPrice':
               // 낮은 가격 순으로 정렬
               this.newProductSorted.sort((a, b) => a.price - b.price);
               break;
             case 'highPrice':
               // 높은 가격 순으로 정렬
               this.newProductSorted.sort((a, b) => b.price - a.price);
               break;
             default:
               break;
           }
           this.currentPage = 1;
          },
          updateItemsPerPage(items) {
            this.itemsPerPage = items;
            this.currentPage = 1; // Reset to the first page whenever items per page changes
          },
          changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
              this.currentPage = page;
            }
          }
     }
     }
     </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  
  h4 {
    margin-bottom: 20px;
  }
  
  .row {
    margin-bottom: 20px;
  }
  
  .text-right {
    text-align: right;
  }
  
  .btn-outline-primary {
    margin-top: 20px;
  }
  </style>