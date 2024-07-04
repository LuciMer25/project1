<template>
  <div class="col-md-9">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>상품이미지</th>
              <th>상품명</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wish in wishList">
            <td>{{ wish.p.prod_no }}</td>
            <td><img :src="`/api/upload/products/${wish.p.prod_no}/${wish.p.prod_img}`" alt="상품 이미지" width="50" height="50"></td>
            <td>{{ wish.p.prod_name }}</td>
            <td>{{ wish.p.price }}</td>
          </tr>
          </tbody>
        </table>
      </div>
</template>
<script>
  import axios from "axios";
  export default {
    data() {
    return {
      wishList: [],
    };
  },
  created(){
    this.getWishList();
  },
  methods: {
    async getWishList() {
        const user = sessionStorage.getItem("user_id");
        console.log('유저정보:', user);
        const response = await axios.get(`/api/wishlist/wish/${user}`);
        this.wishList = response.data.list;
        console.log(this.wishList);
      
    }
  },

}
</script>

<style scoped>

</style>
