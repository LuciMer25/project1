<template>
 <h1
 :key="i" 
  v-for="(product, i) in SearchResult"
  >
    {{ product.prod_name }}검색결과
 </h1>    
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
           
        }
    },
    created(){
        const keyword = this.$route.params.keyword;
        console.log(keyword);
        axios.get(`/api/search/product/${keyword}`)
    },
    methods: {
        
    }

}
</script>



