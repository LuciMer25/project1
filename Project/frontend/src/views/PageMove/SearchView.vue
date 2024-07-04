<template>
  <div class="container">
     <div class="row">
        <CategoryContent :productsCount="newProduct.length" :itemsPerPage="itemsPerPage" @sort="sortProducts" @update-items-per-page="updateItemsPerPage"/>
         <div class="col-md-3" v-for="(product, index) in newProductSorted" :key="index">
         <div class="card">
           <img :src="`/api/upload/products/${product.prod_no}/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
           <div class="card-body">
             <h5 class="card-title">{{ product.prod_name }}</h5>
             <p class="card-text">{{ product.price }} 원</p>
             <p class="card-text">★{{ product.avg_score }} ({{ product.cnt }})</p>
           </div>
         </div>
     </div>
     </div>
 </div>
 </template>
 
 <script>
 import axios from 'axios';
 import CategoryContent from "../../components/product/CategoryContent.vue";
 
 export default {
   components:{
     CategoryContent,
   },
   data(){
     return{
         newProduct : [],
         newProductSorted : []
     }
   },
   created() {
     this.getNewProduct();
   },
   methods: {
     async getNewProduct()   {
      console.log('받은값 :  '+ this.$route.params.keyword);
       try {
        //  let result = await axios.get(`/api/newproduct`);
         let result2 = await axios.get(`/api/search/product`,{params:{product:this.$route.params.keyword}});
         console.log(result2);
         this.newProduct = result2.data;
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
             if (a.avg_score > b.avg_score) return -1;
             if (a.avg_score < b.avg_score) return 1;
 
             // 2차 정렬: score가 같다면 리뷰 개수가 많은 순서대로 정렬
             if (a.cnt > b.cnt) return -1;
             if (a.cnt < b.cnt) return 1;
 
         return 0;
       });          
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
     },
       gotoDetail(no){
           this.$router.push(`product/${no}`);
       }
 }
 }
 </script>
 
 <style>
 .card-body{
   text-align : left;
 }
 </style>