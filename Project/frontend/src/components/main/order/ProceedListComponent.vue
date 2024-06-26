<template>
    <!-- <v-row>
      <v-divider></v-divider>
      <div class="text-h5">주문상품</div>
    <v-divider></v-divider>
    <v-row  v-for="item in itemList">
      <v-text align="center">{{ item.prod_img }} {{ item.prod_name }} {{ item.prod_cnt }}개 {{ item.price }}</v-text>
    </v-row>
    </v-row> -->
    <v-row>
      <v-divider></v-divider>
      <div class="text-h5">주문상품</div>
      <v-divider></v-divider>
    </v-row>
    <v-row  v-for="item in itemList">
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-img src="image-url.jpg" contain></v-img>
          </v-col>
          <v-col cols="6" class="d-flex align-center">
            <div>
              <div>{{ item.prod_name }}</div>
            </div>
          </v-col>
          <v-col cols="2" class="d-flex align-center">
            <div> {{ item.prod_cnt }}개 </div>
          </v-col>
          <v-col cols="2" class="d-flex align-center text-right">
            <div>{{ item.price }}원</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
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

