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
        <v-btn @click="proceed(itemList.length)" color="#D3233A" size="large"class="flex-grow-1" variant="flat">{{ totalprice }}원 주문하기</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserInfo from '@/components/main/order/UserInfoComponent.vue'
import OrderList from '@/components/main/order/ProceedListComponent.vue'
import AddressComp from '@/components/main/order/AddressComponent.vue'
import PortOne from '@portone/browser-sdk/v2';
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
            total += item.price;
          }
          this.totalprice = total;

          return total;
        },
   },
  methods:{
    setpaycode(pay){
      this.payment = pay;
    },
    proceed(itemCount){
      let proceedInfo={user:{},itemInfo:''};
      if(itemCount>1){proceedInfo.itemInfo = `${this.itemList[0].prod_name+' 외 '+itemCount-1+'건'}`}
      else{proceedInfo.itemInfo = this.itemList[0].prod_name}
      proceedInfo.user = this.$store.getters.getUserInfo;
      if(this.payment == 'kakao'){
        this.kakaoPay(proceedInfo);
      }
      else if(this.payment == 'toss'){
        this.tossPay(proceedInfo);
      }
    },
     kakaoPay(proceed){
          PortOne.requestPayment({
                                    // Store ID 설정
                                    storeId: "store-48e0d738-fd6d-4a46-bfb7-aedffef0b647",
                                    // 채널 키 설정
                                    channelKey: "channel-key-ee0cacc5-2d48-4eaa-9dd9-8b4dfecfc881",
                                    paymentId: `payment-${crypto.randomUUID()}`,
                                    orderName: proceed.itemInfo,
                                    totalAmount: this.totalprice,
                                    currency: "CURRENCY_KRW",
                                    payMethod: "EASY_PAY",
                                }).then(res=>res)
                                  .catch(err=>console.log(err));
          
    },
     tossPay(proceed) {
      console.log(proceed);
          PortOne.requestPayment({
                            storeId: "store-48e0d738-fd6d-4a46-bfb7-aedffef0b647",
                            paymentId: `payment-${crypto.randomUUID()}`,
                            orderName: proceed.itemInfo,
                            totalAmount: this.totalprice,
                            currency: "KRW",
                            channelKey: "channel-key-af2f729c-7952-408c-8290-6a30c10c5785",
                            payMethod: "EASY_PAY",
                            easyPay: {},
                            customer: {
                              customerId: proceed.user.user_id,
                              fullName: proceed.user.name,
                              phoneNumber: proceed.user.phone,
                              email: proceed.user.email,
                            },
                          }).then(res=>console.log(res))
                            .catch(err=>console.log(err));
          
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('진행중인 내용이 저장되지 않을 수 있습니다.');
    if (answer) {
      this.$store.dispatch('updateItemList', []);
      next();
    } else {
      next(false);
    }
  }
}
</script>

<!-- color="indigo-darken-3"
        size="large"
        variant="flat"
        block -->