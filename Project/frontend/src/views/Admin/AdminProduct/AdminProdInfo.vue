<template>
    <v-container class="product-detail">
      <v-row>
        <v-col cols="12" md="6" class="text-center">
          <v-img 
            :src="`/api/upload/${product.prod_img}`" 
            alt="상품 이미지" 
            max-height="300"
            max-width="300"
            class="mx-auto"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <div class="product-info">
            <h5 class="product-title">상품번호 : {{ product.prod_no }}</h5>
            <h1 class="product-title">상품명 : {{ product.prod_name }}</h1>
            <v-rating value="5" dense v-model="product.avg_score" readonly></v-rating>
            <p class="reviews-count">{{ product.avg_score }} ({{ product.cnt }}건)</p>
            <h2 class="price">{{ formatCurrency(product.price) }}원</h2>
            <p class="origin">원산지: 상품정보 원산지표시 참조</p>
            <p class="origin">대분류: {{ product.top_ctgr_name }}</p>
            <p class="origin">소분류: {{ product.ctgr_name }}</p>
            <p class="origin">등록일: {{ formatDate(product.reg_date) }}</p>
            <v-row class="quantity-selector" align="center" justify="center">
              <v-col cols="auto" class="text-right">
               
              </v-col>
            </v-row>
            <h2 class="total-price"></h2>
            <v-row class="actions">
              <v-col>
                <v-btn outlined color="red" class="mx-2" @click="goUpdateForm(product.prod_no)">수정</v-btn>
                <v-btn outlined color="red" class="mx-2"@click="deleteBtn(product.prod_no)">삭제</v-btn>
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
        product: {},
        pronNo : null

      };
    },
    created() {
        const no = this.$route.params.no;
        console.log(no);
        axios.get(`/api/adminProduct/prodInfo/${no}`)
        .then(res => {
            this.product = res.data.list[0];
            console.log(this.product);
        })
    },
    computed: {
     
    },
    methods: {
      goUpdateForm(prod_no) {
        console.log(this.prod_no)
        this.$router.push(`/admin/prodUpdate/${prod_no}`)
      },
      deleteBtn(prod_no){
        console.log(prod_no)
        axios.delete(`/api/adminProduct/prodDelete/${prod_no}`)
        .then(() => {
          this.$swal("상품이 삭제되었습니다.")
          this.$router.push(`/admin/prodList`)
        })
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },
        formatCurrency(amount) {
          if (amount === undefined || amount === null) {
            return '0';
          }
          return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    word-break: break-word; 
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
    display: block; 
  }
  </style>
  