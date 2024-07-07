<template>
    <div>
      <CompleteDetail :data="orders"></CompleteDetail>
    </div>
  </template>
  
  <script>
  import CompleteDetail from '@/components/Admin/CompleteDetailComponent.vue';
  import axios from 'axios';
  
  export default {
    components: {
      CompleteDetail
    },
    data() {
      return {
        orders: {
          product: [],
          user: {
            order_date: '',
            buy_complete_date: '',
            waybill_no: '',
            order_total_amount: '',
            name: '',
            phone_no: '',
            post_no: '',
            addr: '',
            detail_addr: '',
            paytype: ''
          }
        }
      };
    },
    async created() {
      const no = this.$route.params.no;
      console.log(no);
      try {
        let productData = await axios.get(`/api/adminOrder/orderProdDetail/${no}`);
        this.orders.product = productData.data.list;
  
        let userData = await axios.get(`/api/adminOrder/adminCompleteDetail/${no}`);
        this.orders.user = userData.data;

        console.log(productData.data);
        console.log("사용자 데이터", userData.data);
  
      } catch (error) {
        console.log(error);
      }
    }
  };
  </script>