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
            <img
            :src="`/api/upload/products/${item.prod_img}`"
            :alt="item.prod_name"
            @error="onImageError"
            :data-fallback="fallbackImg"
            style="max-height: 100px; max-width: 100px; object-fit: contain;"
          />
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
            <div>{{ formatPrice(item.order_amount) }}원</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row >
          <v-col cols="8" class="d-flex align-center">
            <div>
              <div>총 주문금액</div>
            </div>
          </v-col>
          <v-col cols="2" class="d-flex align-center">
            <div> {{ formatPrice(totalAmount) }}원 </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
  </template>
  <script>
  
    export default {
      data (){
        return {
          itemList:[],
          fallbackImg: '/imgs/loadfail.jpg',
          totalAmount:0
        }
      },
      created(){
        this.itemList = this.$store.getters.getItemList;
        console.log(this.itemList);
        this.totalAmount = this.itemList.reduce((acc, item) => acc + item.order_amount, 0);
      },
      methods: {
        onImageError(event) {
          if (event && event.target) {
            event.target.src = this.fallbackImg;
          }
        },
        formatPrice(value) {
          return value.toLocaleString();
        },
      },
    }
  </script>

