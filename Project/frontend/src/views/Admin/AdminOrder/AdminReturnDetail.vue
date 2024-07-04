<template>
	<div>
	  <returnDetail :data="orders"></returnDetail>
	</div>
  </template>
  
  <script>
  import returnDetail from '@/components/Admin/ReturnDetailComponent.vue'
  import axios from 'axios'
  
  export default {
	components: {
        returnDetail
	},
	data() {
	  return {
		orders: {
		  product: [],
		  user: {
			return_req_date: '',
			return_complete_date: '',
			order_total_amount: '',
			name: '',
			phone_no: '',
			post_no: '',
			addr: '',
			detail_addr: '',
			paytype: '',
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

            let userData = await axios.get(`/api/adminOrder/returnUserDetail/${no}`)
            this.orders.user = userData.data; 
            console.log(userData.data);

        } catch(error) {
        console.log(error)
        }
	 
	}
}
</script>