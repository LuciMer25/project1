<template>
    <v-row>
      <v-divider></v-divider>
      <div class="text-h5">주문상품</div>
    <v-divider></v-divider>
    <div v-for="item in itemList">
        {{ item.prod_img }} {{ item.prod_name }} {{ item.prod_cnt }}개 {{ item.price }}  
    </div>
    </v-row>
    
  </template>
  <script>
  import axios from 'axios';
  
    export default {
      data (){
        return {
          itemList:[],
        }
      },
      created(){
        this.itemList = this.$store.getters.getItemList;
        console.log(this.itemList);
      },
      methods: {  
 
      },
    }
  </script>

