<template	>
    <div class ="container">
    <a href="inquiryform">문의등록</a>
     <table class ="table	table-hover">
      <thead	>
       <tr	>
        <th	>문의번호</th	>
        <th	>제목 </th	>
        <th	>작성일자 </th	>
        <th	>답변상태 </th	>
        <th></th>    
       </tr	>
      </thead	>
      <tbody	>
       <tr
        :key ="i"
        v-for ="(inquiry ,	i )	in inquiryList"
        @click ="goToDetail(inquiry.inquiry_no )" 	   >
        <td	>{{inquiry.inquiry_no }}</td	>
        <td	>{{inquiry.inquiry_title }}</td	>
        <td	>{{inquiry.reg_date }}</td	>
        <td	>{{inquiry.comment_state }}</td	>
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
      inquiryList: [],
     };
    },
    created()	{
     this.getInquiryList();
    },
    methods: {
     async getInquiryList()	{
      let result =	await axios.get(`/api/inquiry`);
      this.inquiryList = result.data ;
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
