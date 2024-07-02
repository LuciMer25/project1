<template>
  <div class="container">
    <a href="reviewform">리뷰등록</a>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>리뷰번호</th>
          <th>평점</th>
          <th>제목</th>
          <th>등록날짜</th>
          <th>아이디</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(review, i) in review"
          @click="goToDetail(review.review_no)">
          <td>{{ review.review_no }}</td>
          <td>{{ review.score }}</td>
          <td>{{ review.review_title }}</td>
          <td>{{ review.reg_date }}</td>
          <td>{{ review.user_id }}</td>
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
            review: [],
        }
    },
    created(){
        this.getReviewList();
    },
    methods: {
     async getReviewList()	{
      let result =	await axios.get(`/api/review`);
      this.review = result.data ;
     },
     goToDetail(review_no )	{
      this.$router.push({	path:"/reviewInfo",	query: {review_no:review_no }	});
     },
    }
}
</script>
<style scoped>
table * {
  text-align: center;
}
</style>
