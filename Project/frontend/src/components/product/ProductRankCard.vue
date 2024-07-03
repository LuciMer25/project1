<template>
  <div class="col-md-3">
    <div class="card">
      <div class="position-relative">
          <img :src="`/api/upload/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
          <span class="rank-badge">{{ rank + 1  }}</span> <!-- 순위 표시 -->
        </div>
      <div class="card-body">
        <h5 class="card-title">{{ product.prod_name }}</h5>
        <p class="card-text-price">{{ product.price }} 원</p>
        <p class="card-text-review">★{{ product.review_avg_score }} ({{ product.review_cnt }})</p>
      </div>
      <v-btn @click="setCart">CART</v-btn>
      <v-btn @click="setWish">WISH</v-btn>
    </div>
  </div>
  <!-- 모달창 -->
  <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline text-center">로그인 필요</v-card-title>
        <v-card-text class="text-center">로그인이 필요한 서비스입니다.</v-card-text>
        <v-card-text class="text-center">로그인 하시겠습니까?</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn  color="grey" text @click="dialog = false" class="flex-grow-1 bordered-button">취소</v-btn>
          <v-btn  color="red" text @click="redirectToLogin" class="flex-grow-1 bordered-button">확인</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

  <v-dialog v-model="cartdialog" max-width="400">
    <v-card>
      <v-card-title class="headline text-center">장바구니 추가 완료!</v-card-title>
      <v-card-actions class="justify-center">
        <v-btn  color="red" text @click="redirectToCart" class="flex-grow-1 bordered-button">장바구니 보기</v-btn>
        <v-btn  color="grey" text @click="cartdialog=false" class="flex-grow-1 bordered-button">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <v-dialog v-model="wishdialog" max-width="400">
    <v-card>
      <v-card-title class="headline text-center" v-text="toggleMessage"></v-card-title>
      <v-card-actions class="justify-center">
        <v-btn  color="red" text @click="wishdialog=false" class="flex-grow-1 bordered-button">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    rank : {
      type: Number,
      required: true
    }
  },
  data(){
    return{
      dialog: false, // 모달 창 표시 여부
      wishdialog:false,
      cartdialog:false,
    }
  },
  methods : {
    gotoDetail(no){
      this.$router.push(`product/${no}`);
    },
    setCart(){
        console.log('cart called')
        // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
        console.log(this.checkLogin());
        if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addCart`,{
          user_id:this.$store.getters.getUserInfo.user_id,
          prod_no:this.product.prod_no,
          prod_cnt: 1
        })
        .then(res=>{
          console.log(res.statusText);
            if(res.statusText=="OK"){
              this.cartdialog = true;
            }
        });

      }
      // 모달 창 열기
      else{this.dialog = true;}
    },
    setWish(){
      // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
      if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addWish`,{
          user_id:this.$store.getters.getUserInfo.user_id,
          prod_no:this.product.prod_no
        })
        .then(res=>{
                    if(res.data.result=='added'){
                      this.toggleMessage='위시 추가완료'
                      this.wishdialog=true;                   
                    }
                    else if(res.data.result=='removed')
                    {
                      this.toggleMessage='위시 삭제완료'
                      this.wishdialog=true;
                    }     
        })
      }
      // 모달 창 열기
      else{this.dialog = true;}
    },
    checkLogin() {
      // 로그인 유무 체크 로직 (예시)
      const isLoggedIn = this.$store.getters.getUserInfo != null; // 실제 로그인 여부를 확인하는 로직으로 대체
      return isLoggedIn;
    },
    redirectToLogin(){
      this.dialog = false;
      this.$router.replace('/login');
    },
    redirectToCart(){
      this.cartdialog=false;
      this.$router.replace('/cart');
    }
  }
};
</script>

<style scoped>
.card-text-review {
  font-size : 15px;
  text-align : left;
}
.card-text-price{
  font-size : 30px;
  font-weight : 500;
  text-align : left;
}
.card-title{
  text-align : left;
}
.position-relative {
position: relative;
}
.rank-badge {
position: absolute;
top: 10px;
left: 10px;
padding: 5px;
border-radius: 50%;
font-size: 20px;
font-weight: bold;
color:red;
text-decoration: underline;
}
.card-body{
  text-align : left;
}
</style>
