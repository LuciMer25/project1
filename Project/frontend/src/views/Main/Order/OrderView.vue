<template>
  <v-container class="mb-2 w-75" >
    
    <v-divider></v-divider>
        <div class="text-h4 text-left" color="purple"
        variant="outlined">결제</div>
    <v-divider></v-divider>
    <OrderList></OrderList>
    <UserInfo></UserInfo>
    <AddressComp></AddressComp>

    <v-row>
      <v-divider></v-divider>
      <div class="text-h5">결제 수단</div>
    <v-divider></v-divider>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn @click="setpaycode('kakao')" color="yellow" size="large" variant="elevated" :active="payment=='kakao'">카카오페이</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn @click="setpaycode('toss')" color="blue-accent-4" size="large" variant="elevated" :active="payment=='toss'">토스페이</v-btn>
      </v-col>
    </v-row>
    
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn @click="proceed()" color="#D3233A" size="large"class="flex-grow-1" variant="flat">{{ formatPrice(totalprice) }}원 주문하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserInfo from '@/components/main/order/UserInfoComponent.vue'
import OrderList from '@/components/main/order/ProceedListComponent.vue'
import AddressComp from '@/components/main/order/AddressComponent.vue'
import axios from 'axios';
import PortOne from '@portone/browser-sdk/v2';
const kakao = "channel-key-ee0cacc5-2d48-4eaa-9dd9-8b4dfecfc881";
const toss = "channel-key-af2f729c-7952-408c-8290-6a30c10c5785";
export default {
  name: 'OrderView',
  components: {
    OrderList,UserInfo,AddressComp
  },
  data() {
    return {
      itemList: [],
      payment: '',
      totalprice:0
    };
  },
  created() { 
    
  },
  computed: {
        totalprice() {
          this.itemList = this.$store.getters.getItemList;
          let total = 0;
          for(let item of this.itemList){
            total += item.order_amount;
          }
          this.totalprice = total;

          return total;
        },
   },
  methods:{
    setpaycode(pay){
      this.payment = pay;
    },
    proceed(){
      let proceedInfo={user:{},itemInfo:'',channelKey:''};
      if(this.itemList.length>1){
        proceedInfo.itemInfo = `${this.itemList[0].prod_name}외 ${this.itemList.length-1}건`
      }
      else{
        proceedInfo.itemInfo = this.itemList[0].prod_name
      }
      proceedInfo.user = this.$store.getters.getUserInfo;

      if(this.payment == 'kakao'){
        proceedInfo.channelKey=kakao;
        this.checkout(proceedInfo);
      }
      else if(this.payment == 'toss'){
        proceedInfo.channelKey=toss;
        this.checkout(proceedInfo);
      }
      else{
        alert("결제수단을 먼저 선택해주세요!");
      }
    },
    async checkout(proceed){
      // console.log(proceed);
      // console.log(proceed.user);
      // console.log(this.$store.getters.getItemList);
      //console.log('order_total_amount : '+this.totalprice);

      let data = {
                orders:{
                        order_total_amount : this.totalprice, 
                        addr : proceed.user.post_addr, 
                        detail_addr : proceed.user.post_detail_list, 
                        post_no : proceed.user.post_no, 
                        user_id :proceed.user.user_id, 
                        pay_code : '', 
                        phone_no : proceed.user.phone,
                        name : proceed.user.name,
                        paytype: this.payment
                },
                detailList:this.$store.getters.getItemList
              };
      console.log(data);
      
         const result = (await PortOne.requestPayment({
                            storeId: "store-48e0d738-fd6d-4a46-bfb7-aedffef0b647",
                            paymentId: `payment-${crypto.randomUUID()}`,
                            orderName: proceed.itemInfo,
                            totalAmount: this.totalprice,
                            currency: "KRW",
                            channelKey: proceed.channelKey,
                            payMethod: "EASY_PAY",
                            easyPay: {},
                            customer: {
                              customerId: proceed.user.user_id,
                              fullName: proceed.user.name,
                              phoneNumber: proceed.user.phone,
                              email: proceed.user.email,
                            },
                          }));

          data.orders.pay_code = result.txId;
          let checkoutResult = (await axios.post('/api/checkout',data));
          //console.log(checkoutResult);
          this.callCompletePage(checkoutResult);

    },
    async  callCompletePage(result){
      if(result.data.message != ''){
          // 장바구니 항목 삭제를 위한 필터링
          const cartItemsToDelete = this.itemList
                                                .filter(item => item.cart_no)
                                                .map(item => item.cart_no);

          if (cartItemsToDelete.length > 0) {
            console.log("Deleting cart items:", cartItemsToDelete);
            await axios.post('/api/cart/batchDelete', {
                cartNos: cartItemsToDelete
            }).catch(err => {
                console.error('Error in axios.post:', err);
                console.error('Error response:', err.response);
                console.error('Request data:', { cartNos: cartItemsToDelete });
            });
          } 

          alert('결제완료!');
          console.log(result.data.order_no);

          this.$router.push({name:'ordercomplete',params:{orderNo:result.data.order_no}});
        }

    },
    formatPrice(value) {
      return value.toLocaleString();
  },
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('진행중인 내용이 저장되지 않을 수 있습니다.');
    if (answer) {
      this.$store.dispatch('updateItemList', []);
      next();
    } else {
      next(false);
    }
  },
  
}
</script>