<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>위시리스트</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(wish, i) in wishList"
          @click="goToDetail(product.prod_no)">
          <td>{{ wish.wish_no }}</td>
          <td>{{ prod.prod_img }}</td>
          <td>{{ prod.prod_name }}</td>
          <td>{{ prod.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script	>
import axios from "axios";
export	default {
    data ()	{
     return {
      wishList: [],
      product: [],
     };
    },
    created()	{
     this.getWishList();
    },
    methods: {
     async getWishList()	{
      let result =	await axios.get(`/api/wishlist`);
      this.wishList = result.data ;
     },
     goToDetail(inquiry_no )	{
      this.$router.push({	path:"/inquiryInfo",	query: {inquiry_no:inquiry_no }	});
     },
     getDateFormat(date )	{
      return this.$dateFormat(date );
     },
    },
};
</script	>
<style scoped >
table	* {
    text-align:	center ; }
</style	>

