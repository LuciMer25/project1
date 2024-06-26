<template>
  <v-container class="bg-surface-variant ma-6">
    <OrderList></OrderList>
    <UserInfo></UserInfo>
    <AddressComp></AddressComp>

    <v-row>
      <v-divider></v-divider>
      <div class="text-h5">결제 수단</div>
    <v-divider></v-divider>
    </v-row>
  </v-container>
  
</template>
<script>
import UserInfo from '@/components/main/order/UserInfoComponent.vue'
import OrderList from '@/components/main/order/ProceedListComponent.vue'
import AddressComp from '@/components/main/order/AddressComponent.vue'
export default {
  name: 'OrderView',
  components: {
    OrderList,UserInfo,AddressComp
  },
  data() {
    return {
      itemList: []
    };
  },
  created() { 
  },
  methods:{
   
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

