<template>
	<div>
	  <OrderDetail :data="orders"></OrderDetail>
	</div>
  </template>
  
  <script>
  import OrderDetail from '@/components/Admin/OrderDetailComponent.vue'
  import axios from 'axios'
  
  export default {
	components: {
	  OrderDetail
	},
	data() {
	  return {
		orders: {
		  product: [],
		  user: {
			order_date: '',
			waybill_no: '',
			order_total_amount: '',
			name: '',
			phone_no: '',
			post_no: '',
			addr: '',
			detail_addr: '',
			paytype: ''
		  }
		},
	  }
	},
	async created() {
    	const no = this.$route.params.no;
    	console.log(no);
    	try {
      		let productData = await axios.get(`/api/adminOrder/orderProdDetail/${no}`);
      		this.orders.product = productData.data.list;

      		let userData = await axios.get(`/api/adminOrder/orderUserDetail/${no}`);
      		this.orders.user = userData.data;
    
    	} catch (error) {
      		console.log(error);
    	}
  	}
  }
  </script>