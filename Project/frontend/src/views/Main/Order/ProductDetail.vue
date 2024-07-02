<template>
  <v-container class="product-detail">
    <v-row>
      <v-col cols="12" md="6" class="text-center">
        <v-img 
          :src="`${titleImage}`" 
          alt="상품 이미지" 
          @error="onImageError"
          max-height="400"
          max-width="400"
          class="mx-auto image-with-border"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <div class="product-info">
          <h1 class="product-title" v-text="product.prod_name"></h1>
          <v-rating value="5" dense v-model="product.avg_score" readonly></v-rating>
          <p class="reviews-count">{{ product.avg_score }} ({{ product.cnt }}건)</p>
          <h2 class="price">{{ formatPrice(product.price) }}원</h2>
          <p class="origin">원산지: 상품정보 원산지표시 참조</p>
          <v-row class="quantity-selector" align="center" justify="center">
            <v-col cols="auto" class="text-right">
              <span>수량선택</span>
            </v-col>
            <v-col cols="auto">
              <v-btn icon @click="decreaseQuantity">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="quantity"
                type="number"
                min="1"
                readonly
                style="width: 55px; font-size: 1.2rem;"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn icon @click="increaseQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <h2 class="total-price">총금액: {{ formatPrice(order_amount) }}원</h2>
          <v-row class="actions">
            <v-col>
              <v-btn outlined color="red" class="mx-2" @click="setWish">위시리스트</v-btn>
              <v-btn outlined color="red" class="mx-2" @click="setCart">장바구니</v-btn>
              <v-btn color="red" class="mx-2" @click="gotoOrderPage">바로구매</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <!--모달창-->
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
  <ContentsImg :img="`/api/upload/products/${product.prod_no}/${product.prod_content_img}`"/>

  <ReviewComponent :prodNo="this.$route.params.prodNo"></ReviewComponent>
  </v-container>
</template>

<script>
import axios from 'axios';
import ContentsImg from '@/components/main/productdetail/ContentImg.vue'
export default {
  components:{ContentsImg},
  data() {
    return {
      quantity: 1,
      product: {},
      titleImage: '',
      fallbackImage:'/imgs/loadfail.jpg',
      dialog: false, // 모달 창 표시 여부
      wishdialog:false,
      cartdialog:false,
      toggleMessage:''
    };
  },
  created() {
    this.getProduct(this.$route.params.prodNo);
  },
  computed: {
    order_amount() {
      return this.quantity * this.product.price;
    },
  },
  methods: {
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    async getProduct(no) {
      this.product = (await axios.get(`/api/productInfo/${no}`)).data[0];
      this.titleImage = `/api/upload/products/${this.product.prod_no}/${this.product.prod_img}`; 
      console.log(this.product);
    },
    onImageError() {
      this.titleImage = this.fallbackImage; // 이미지 로딩 실패 시 대체 이미지로 변경
    },
    gotoOrderPage(){
      let array = [
      ];
      console.log(this.checkLogin());
      // 회원 주문
      if(this.checkLogin())
      {
        array.push(
        {
          prod_no:this.product.prod_no,
          prod_name:this.product.prod_name,
          prod_cnt:this.quantity,
          price:this.product.price,
          order_amount:this.order_amount,
          prod_img:this.product.prod_img
        });

        this.$store.dispatch('updateItemList', array);
        this.$router.push({ name: 'order' });
      }
      // 비회원 주문(결제페이지 미구현으로 현재는 모달 창 열기로 대체)
      else{this.dialog = true;}
      
    },
    setCart(){
      // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
      if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addCart`,{
          user_id:this.$store.getters.getUserInfo.userId,
          prod_no:this.product.prod_no,
          prod_cnt: this.quantity
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
          user_id:this.$store.getters.getUserInfo.userId,
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
    formatPrice(value) {
      if (value == null || value === undefined) {
        value = 0; 
      }
      return value.toLocaleString();
    },
    redirectToCart(){
      this.cartdialog=false;
      this.$router.replace('/cart');
    }
  }
}
</script>

<style scoped>
.product-detail {
  margin-top: 20px;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  word-break: break-word; /* 긴 텍스트 줄바꿈 */
}

.reviews-count {
  margin: 10px 0;
}

.price {
  font-size: 1.8rem;
  color: #d32f2f;
  margin: 10px 0;
}

.origin {
  color: #757575;
  margin-bottom: 20px;
}

.quantity-selector {
  margin-bottom: 20px;
}

.total-price {
  font-size: 1.5rem;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
  display: block; /* 중앙 정렬을 위해 블록으로 설정 */
}
.image-with-border {
  border: 1.5px solid #CCC; /* 검정색 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 4px; /* 테두리와 이미지 간의 간격 */
}
.flex-grow-1 {
  flex-grow: 1;
  margin: 0 4px;
}
.bordered-button {
  border: 1px solid #ccc; /* 테두리 추가 */
  border-radius: 4px; /* 테두리 모서리 둥글게 */
}
</style>
