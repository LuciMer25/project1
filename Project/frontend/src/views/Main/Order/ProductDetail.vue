<template>
  <v-container class="product-detail">
    <v-row>
      <v-col cols="12" md="6" class="text-center">
        <v-img 
          :src="`/api/upload/${product.prod_img}`" 
          alt="상품 이미지" 
          @error="onImageError"
          max-height="300"
          max-width="300"
          class="mx-auto"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <div class="product-info">
          <h1 class="product-title" v-text="product.prod_name"></h1>
          <v-rating value="5" dense v-model="product.avg_score" readonly></v-rating>
          <p class="reviews-count">{{ product.avg_score }} ({{ product.cnt }}건)</p>
          <h2 class="price">{{ product.price }}원</h2>
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
          <h2 class="total-price">총금액: {{ order_amount }}원</h2>
          <v-row class="actions">
            <v-col>
              <v-btn outlined color="red" class="mx-2">위시리스트</v-btn>
              <v-btn outlined color="red" class="mx-2">장바구니</v-btn>
              <v-btn color="red" class="mx-2">바로구매</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quantity: 1,
      product: {},
      titleImage: '',
      fallbackImage:'/imgs/loadfail.png',
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
      this.titleImage = `/api/upload/${this.product.prod_img}`; 
      console.log(this.product);
    },
    onImageError() {
      this.imageSrc = this.fallbackImage; // 이미지 로딩 실패 시 대체 이미지로 변경
    }

  },
};
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
</style>
