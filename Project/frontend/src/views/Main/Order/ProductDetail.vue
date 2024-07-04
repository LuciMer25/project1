<template>
  <v-container class="product-detail">
    <v-row justify="center">
      <v-col cols="10" md="5" class="text-center">
        <v-img 
          :src="`${titleImage}`" 
          alt="상품 이미지" 
          @error="onImageError"
          height="450"
          width="450"
          class="mx-auto image-with-border"
        ></v-img>
      </v-col>
      <v-col cols="10" md="5">
        <div class="product-info">
          <v-row justify="end" class="mb-2">
            <v-btn icon @click="setWish">
              <v-icon v-if="iswished">mdi-heart</v-icon>
              <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>
          </v-row>
          <h1 class="product-title" v-text="product.prod_name"></h1>
          <v-rating  dense v-model="product.avg_score" readonly half-increments></v-rating>
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
              <v-btn outlined color="red" class="mx-2" @click="setCart">장바구니</v-btn>
              <v-btn color="red" class="mx-2" @click="gotoOrderPage">바로구매</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    
 <!-- 메뉴바 -->
 <v-row class="menu-bar" justify="center">
  <v-col cols="auto" class="menu-button">
    <button text class="w-100" @click="scrollTo('detail')">
      <span>상세정보</span>
    </button>
  </v-col>
  <v-col cols="auto" class="menu-button">
    <button text class="w-100" @click="scrollTo('reviews')">
      <span>상품후기 {{ product.cnt }}</span>
    </button>
  </v-col>
  <v-col cols="auto" class="menu-button">
    <button text class="w-100" @click="scrollTo('inquiries')">
      <span>상품문의</span>
    </button>
  </v-col>
</v-row>
<v-col cols="12" md="3" class="right-case">
  <div class="product-info center-content">
    <h1 class="product-title" v-text="product.prod_name"></h1>
    <h2 class="price">{{ formatPrice(product.price) }}원</h2>
    <p class="origin">원산지: 상품정보 원산지표시 참조</p>
    <v-row class="quantity-selector" align="center" justify="center">
      <v-col cols="auto" class="text-right">
        <span>수량선택</span>
      </v-col>
      <v-col cols="auto">
        <button @click="decreaseQuantity" class="quantity-btn">-</button>
      </v-col>
      <v-col cols="auto">
        <input
          v-model="quantity"
          type="number"
          min="1"
          readonly
          class="quantity-input"
        />
      </v-col>
      <v-col cols="auto">
        <button @click="increaseQuantity" class="quantity-btn">+</button>
      </v-col>
    </v-row>
    <h2 class="total-price">총금액: {{ formatPrice(order_amount) }}원</h2>
    <div class="actions">
  <v-col cols="auto">
    <v-btn outlined color="red" class="mx-2 inline-btn" @click="setCart">장바구니</v-btn>
  </v-col>
  <v-col cols="auto">
    <v-btn color="red" class="mx-2 inline-btn" @click="gotoOrderPage">바로구매</v-btn>
  </v-col>
</div>
  </div>
</v-col>
  <div id="detail">
      <ContentsImg :img="`/api/upload/products/${product.prod_no}/${product.prod_content_img}`"/>
    </div>
    <div id="reviews">
      <ReviewComponent :prodNo="this.$route.params.prodNo"></ReviewComponent>
    </div>
    <div id="inquiries">
      <!-- 문의사항 컴포넌트 여기에 추가 -->
       <ProductQna :prodNo="this.$route.params.prodNo"></ProductQna>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import ContentsImg from '@/components/main/productdetail/ContentImg.vue';
import ReviewComponent from '@/components/main/productdetail/ReviewComponent.vue';
import ProductQna from '@/components/main/productdetail/ProductQnaComponent.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
  components:{ContentsImg,ReviewComponent,ProductQna},
  data() {
    return {
      quantity: 1,
      product: {},
      titleImage: '',
      fallbackImage:'/imgs/loadfail.jpg',
      toggleMessage:'',
      iswished:false,
      modalMessage:''
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
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    async getProduct(no) {
      let user = this.$store.getters.getUserInfo;
      
      if(user != null){
        console.log(user);
        let result =(await axios.post(`/api/productInfo/withWish/`,{no:no,user_id:user.user_id}));
        this.product = result.data.product[0];
        //this.titleImage = `/api/upload/products/${this.product.prod_no}/${this.product.prod_img}`; 
        this.iswished = typeof result.data.iswished[0] !== 'undefined';
        //console.log(this.iswished);
      }
      else{
        this.product = (await axios.get(`/api/productInfo/${no}`)).data[0]
        //console.log('user정보 없음');
      }
      
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
      else{this.warningModal();}
      
    },
    setCart(){
      // 로그인 했을시(추후 this.checkLogin앞에 ! 제거해야함.)
      if(this.checkLogin())
      {
        axios.post(`/api/productInfo/addCart`,{
          user_id:this.$store.getters.getUserInfo.user_id,
          prod_no:this.product.prod_no,
          prod_cnt: this.quantity
        })
        .then(res=>{
          console.log(res.statusText);
            if(res.statusText=="OK"){
              this.cartdialog = true;
              this.modalMessage = 'addcart';
              this.messageModal();
            }
        });

      }
      // 모달 창 열기
      else{
        //this.dialog = true;
        this.warningModal();
      }
    },
    warningModal(){
      this.$swal.fire({
          title: '로그인이 필요합니다',
          text: '로그인 먼저 해주세요.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '로그인',
          cancelButtonText: '취소'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.replace('/login');
          }
        });
    },
    messageModal(){
      let titleText='';
      let content = ''
      switch (this.modalMessage) {
        case 'addwish':
          titleText='위시리스트'
          content='찜 목록에 추가되었습니다!'
          break;
        case 'delwish':
          titleText='위시리스트'
          content='찜 목록에서 삭제되었습니다!'
        break;
        case 'addcart':
          titleText='장바구니'
          content='장바구니에 추가되었습니다!'
        break;
        default:
          break;
      }
      this.$swal.fire({
          title: titleText,
          text: content,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#d33',
          confirmButtonText: '확인'
        });
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
                      this.toggleMessage='위시 추가완료';
                      this.modalMessage='addwish';
                      this.iswished = true;
                      this.wishdialog=true;
                      this.messageModal();                   
                    }
                    else if(res.data.result=='removed')
                    {
                      this.toggleMessage='위시 삭제완료';
                      this.modalMessage='delwish';
                      this.iswished = false;
                      this.wishdialog=true;
                      this.messageModal();
                    }     
        })
      }
      // 모달 창 열기
      else{this.warningModal();}
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

.menu-bar {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 0; /* padding 제거 */
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.menu-button {
  padding: 0; /* padding 제거 */
}

.right-case {
  position: sticky;
  top: 20px; /* 필요에 따라 조정 */
  align-self: flex-start;
  height: fit-content;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px; /* 원하는 최대 너비로 조정 */
  margin-left: auto; /* 우측 정렬 */
  z-index: 1000;
}

.w-100 {
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5px;
  margin-right: 5px;
  border: none; /* 경계선 제거 */
}

.menu-button:hover {
  background-color: #e0e0e0; /* hover 시 회색 배경 */
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
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  gap: 10px;
}

.inline-btn {
  display: block;
  width: 100%;
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

.center-content {
  text-align: center;
}

.quantity-btn {
  width: 25px;
  height: 32px;
  line-height: 32px;
  padding: 0;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}

.quantity-input {
  width: 30px;
  height: 32px;
  font-size: 1.2rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
}
</style>
