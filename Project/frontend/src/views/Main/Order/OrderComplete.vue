<template>
    <v-container class="inner-content">
      <v-row class="order-complete" justify="center" align="center">
        <v-col cols="12" class="text-center">
          <div class="order-complete-cont">
            <p class="order-num" style="top: 40px;">
              <span>주문번호 : </span>
              <strong v-text="orderNo"></strong>
            </p>
            <v-img
              src="//www.ottogimall.co.kr/static/imgs/front/cw/images/order/img_order_thx2.png"
              alt="주문해 주셔서 감사합니다."
            ></v-img>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="color-4">
                  [상품준비중] 전까지 주문내역 상세페이지에서 주문 취소가 가능합니다.
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="color-4">
                  평균 배송기간은 영업일 기준 2~4일(결제완료 기준) 입니다.
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
            <RouterLink to="/">
                <v-img
            src="//www.ottogimall.co.kr/static/imgs/front/cw/images/order/img_order_bnr3.png"
            alt="이제 새로 나온 제품들을 만나보시는 건 어떠세요? 신제품 보기"
          ></v-img>
            </RouterLink>
            <!-- <a @click.prevent="gotoMain" target="_blank">
          </a> -->
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import { RouterLink } from 'vue-router';

  export default {
    data(){ return { orderNo:'' }},
    created(){
        this.orderNo = this.$route.params.orderNo;
    },
    methods:{
    }
  };
  </script>
  
  <style scoped>
  .inner-content {
    margin: 0 auto;
    padding: 16px;
  }
  
  .order-complete-cont {
    text-align: center;
  }
  
  .order-num {
    font-size: 1.2em;
    margin-bottom: 16px;
  }
  
  .virtual-account {
    margin-top: 16px;
  }
  
  .color-4 {
    color: #4a4a4a;
  }
  
  .mt-4 {
    margin-top: 1.5rem;
  }
  </style>
  