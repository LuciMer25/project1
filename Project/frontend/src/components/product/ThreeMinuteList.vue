<template>
    <div class="new-product-list">      
      <div class="section-header">
        <h4 class="section-title">3분이면 한 끼 뚝딱</h4>
        <div class="text-right mt-3 load-more">
          <v-btn @click="loadMore">더보기</v-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(product, index) in newProduct.slice(0, 4)" :key="index">
          <div class="card product-card">
            <img :src="`/api/upload/products/${product.prod_no}/${product.prod_img}`" class="card-img-top" alt="Product Image" @click="gotoDetail(product.prod_no)">
            <div class="card-body">
              <h5 class="card-title">{{ product.prod_name }}</h5>
              <p class="card-text">{{ formatPrice(product.price) }}원</p>
            </div>
            <div class="setbtn">
              <v-btn @click="setCart(index)">CART</v-btn>
              <v-btn @click="setWish(index)">WISH</v-btn>
            </div>
          </div>
        </div>
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
    name: 'NewProductList',
    data(){
      return{
          newProduct : [],
          dialog: false, // 모달 창 표시 여부
          wishdialog:false,
          cartdialog:false,
      }
    },
    created(){
      this.getnewProduct()
    },
    computed:{
      formatPrice() {
        return (price) => {
        return price.toLocaleString();
      };
    }
    },
    methods:{
      async getnewProduct() {
        let result = await axios.get(`/api/threeproduct`);
        this.newProduct = result.data;
      },
      loadMore(){
        this.$router.push({ path: "/threeproductlist" });
      },
      gotoDetail(no){
        this.$router.push(`product/${no}`);
      },
    setCart(index){
        console.log('cart called')
        // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
        console.log(this.checkLogin());
        if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addCart`,{
          user_id:this.$store.getters.getUserInfo.user_id,
          prod_no:this.newProduct[index].prod_no,
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
    setWish(index){
      // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
      if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addWish`,{
          user_id:this.$store.getters.getUserInfo.user_id,
          prod_no:this.newProduct[index].prod_no
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
    },
  }
  </script>
  <style scoped>
  .setbtn{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
  .new-product-list {
    padding: 20px;
    border-radius: 10px;
  }
  .section-header {
    display: flex;
    justify-content: space-between; /* h4와 버튼을 같은 라인에 배치 */
    align-items: center;
    margin-bottom: 10px;
  }
  .section-title {
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap; /* 줄바꿈 방지 */
  }
  .load-more {
    margin-top: 0; /* 기본적인 margin-top 제거 */
  }
  .product-card {
    width : 300px;
    height : 350px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    transition: box-shadow 0.3s;
  }
  .product-card:hover .card-img-top {
    transform: scale(1.05);
  }
  .card-body {
    text-align: left;
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
    color: red;
    text-decoration: underline;
  }
  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .card-text {
    font-size: 1rem;
    color: #333;
  }
  .card-img-top {
    transition: transform 0.3s;
    height: 200px;
    object-fit: cover;
  }
  </style>