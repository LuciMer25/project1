<template>
  <div class="home">
    하위
  </div>
  <button @click="gotoOrderPage">결제 테스트</button>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
  },
  methods:{
    gotoOrderPage(){
      
      let array = [
        { prod_no: 1, prod_name: "진라면 매운맛 (120GX5)", prod_cnt: 3, price: 10740, prod_img: "test.png" }
      ];
      this.$store.dispatch('updateItemList', array);
      this.$router.push({ name: 'order' });
    }
  }
}
</script>