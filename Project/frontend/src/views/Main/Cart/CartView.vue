<template>
<v-container>
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <v-checkbox v-model="allSelected" @change="selectAll" label="전체선택"></v-checkbox>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, index) in cartItems" :key="index">
                <v-list-item-content>
                  <v-row align="center">
                    <v-col cols="1">
                      <v-checkbox v-model="item.selected"></v-checkbox>
                    </v-col>
                    <v-col cols="2">
                      <v-img :src="`/api/upload/products/${item.prod_no}/${item.prod_img}`" contain height="50"></v-img>
                    </v-col>
                    <v-col cols="4">
                      <span>{{ item.prod_name }}</span>
                    </v-col>
                    <v-col cols="2">
                      <v-btn icon class="small-btn" @click="decreaseQuantity(index)">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      {{ item.prod_cnt }}
                      <v-btn icon class="small-btn" @click="increaseQuantity(index)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="2">
                      <span>{{ formatPrice(item.price * item.prod_cnt) }}원</span>
                    </v-col>
                    <v-col cols="1">
                      <v-btn icon class="small-btn" @click="removeItem(index,item.cart_no)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>상품금액</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <p>결제예상금액</p>
              <h2>{{ formatPrice(totalAmount) }}원</h2>
            </div>
            <v-btn class="mt-5" color="red" block @click="checkout">
              {{ formatPrice(totalAmount) }}원 주문하기
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      allSelected: false,
      cartItems: [],
      updatedCartItems: []
    };
  },
  created(){
    this.getCartItems();
    window.addEventListener('beforeunload', this.updateCartItems);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.updateCartItems);
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.prod_cnt, 0);
    },
  },
  methods: {
    formatPrice(value) {
      return value.toLocaleString();
    },
    async getCartItems() {
      try {
        const userId = this.$store.getters.getUserInfo.userId; // 사용자 ID 가져오기
        const response = (await axios.post('/api/cart', { userId }));
        this.cartItems = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    selectAll() {
      this.cartItems.forEach((item) => {
        item.selected = this.allSelected;
      });
    },
    increaseQuantity(index) {
      this.cartItems[index].prod_cnt++;
      this.addUpdatedItem(this.cartItems[index]);
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].prod_cnt > 1) {
        this.cartItems[index].prod_cnt--;
        this.addUpdatedItem(this.cartItems[index]);
      }
    },
    addUpdatedItem(item) {
      const existingItem = this.updatedCartItems.find(i => i.cart_no === item.cart_no);
      if (existingItem) {
        existingItem.prod_cnt = item.prod_cnt;
      } else {
        this.updatedCartItems.push({ cart_no: item.cart_no, prod_cnt: item.prod_cnt });
      }
    },
    async deleteCartItem(cartNo) {
      try {
        await axios.delete(`/api/cart/${cartNo}`);
      } catch (error) {
        console.error(error);
      }
    },
    removeItem(index) {
      const cartItem = this.cartItems[index];
      this.cartItems.splice(index, 1);

      // updatedCartItems에서 해당 항목을 제거
      const updatedIndex = this.updatedCartItems.findIndex(item => item.cart_no === cartItem.cart_no);
      if (updatedIndex !== -1) {
        this.updatedCartItems.splice(updatedIndex, 1);
      }

      // 서버에 삭제 요청 보내기
      this.deleteCartItem(cartItem.cart_no);
    },
    async updateCartItems() {
      if (this.updatedCartItems.length > 0) {
        try {
          await axios.put('/api/cart/batchUpdate', { items: this.updatedCartItems });
          //this.updatedCartItems = [];
        } catch (error) {
          console.error(error);
        }
      }
    },
    async checkout() {
      await this.updateCartItems();
      alert("Order placed for " + this.formatPrice(this.totalAmount) + "원");
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
.small-btn {
  height: 24px !important; 
  width: 24px !important;
  min-width: 24px !important;
}
</style>

