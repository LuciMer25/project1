<template>
	<div>
	  <cancelDetail :data="orders"></cancelDetail>
	</div>
  </template>
  
  <script>
  import cancelDetail from '@/components/Admin/CancelDetailComponent.vue'
  import axios from 'axios'
  
  export default {
	components: {
        cancelDetail
	},
	data() {
	  return {
		orders: {
		  product: [],
		  user: {
			cancel_req_date: '',
			cancel_complete_date: '',
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
            let productData = await axios.get(`/api/adminOrder/orderProdDetail/${no}`)
            this.orders.product = productData.data.list;
            console.log(productData.data.list);

            let userData = await axios.get(`/api/adminOrder/cancelUserDetail/${no}`)
            this.orders.user = userData.data; 
            console.log(userData.data);

        } catch(error) {
        console.log(error)
        }
	 
	}
}
</script>