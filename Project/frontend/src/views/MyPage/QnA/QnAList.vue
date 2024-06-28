<template	>
    <div class ="container">
    <a href="qnaform">QnA등록</a>
     <table class ="table	table-hover">
      <thead	>
       <tr	>
        <th	>QnA번호</th	>
        <th	>제목 </th	>
        <th	>작성일자 </th	>
        <th	>답변상태 </th	>
        <th></th>    
       </tr	>
      </thead	>
      <tbody	>
       <tr
        :key ="i"
        v-for ="(qna ,	i )	in qnaList"
        @click ="goToDetail(qna.qna_no )" 	   >
        <td	>{{qna.qna_no }}</td	>
        <td	>{{qna.qna_title }}</td	>
        <td	>{{qna.reg_date }}</td	>
        <td	>{{qna.comment_state }}</td	>
       </tr	>
      </tbody	>
     </table	>
    </div	>
</template	>
<script	>
import axios from "axios";
export	default {
    data ()	{
     return {
        qnaList: [],
     };
    },
    created()	{
     this.getqnaList();
    },
    methods: {
     async getqnaList()	{
      let result =	await axios.get(`/api/qna`);
      this.qnaList = result.data ;
     },
     goToDetail(qna_no )	{
      this.$router.push({	path:"/qnaInfo",	query: {qna_no:qna_no }	});
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
