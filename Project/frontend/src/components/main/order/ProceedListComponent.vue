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
            <v-img 
          max-height="100"
          max-width="100"
          :src = "`/api/upload/products/${item.prod_no}/${item.prod_img}`" contain
          @error="onImageError"></v-img>
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
            <div>{{ item.order_amount }}원</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </template>
  <script>
  
    export default {
      data (){
        return {
          itemList:[],
          fallbackImg: '/public/imgs/loadfail.jpg',
        }
      },
      created(){
        this.itemList = this.$store.getters.getItemList;
        console.log(this.itemList);
      },
      methods: {  
        onImageError(event) {
          event.target.src = this.fallbackImg;
        },
      },
    }
  </script>

