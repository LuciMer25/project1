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
          v-for="(wish, i) in wishlist">
          <td>{{ wish.wish_no }}</td>
          <td>{{ wish.wish_img }}</td>
          <td>{{ wish.wish_name }}</td>
          <td>{{ wish.wish_price }}</td>
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
      wishlist: [],
     };
    },
    created()	{
     this.getWishList();
    },
    methods: {
     async getWishList(){
            axios.get('/api/wishlist')
                .then(res => {
                    this.wishList = res.data.list;
                })
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

