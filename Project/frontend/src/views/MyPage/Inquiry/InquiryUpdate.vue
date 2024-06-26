<template>
  <div class="container">
    <form @submit.prevent>
      <label for="no">문의번호</label>
      <input type="text" id="no" v-model="inquiryInfo.inquiry_no" />
      <label for="name">문의사항</label>
      <input type="text" id="inquiry_title" v-model="inquiryInfo.inquiry_title" />
      <textarea
        id="inquiry_content"
        style="height: 200px"
        v-model="inquiryInfo.inquiry_content"
      ></textarea>


      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveBoard(inquiryInfo.inquiry_no)">
        수정
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export	default {
 	data ()	{
 	 return {
 	  searchNo:"",
 	  inquiryInfo: {},
 	 };
 	},
 	created()	{
 	 this .searchNo =	this .$route.query.inquiry_no ;
 	 this.getInquiryInfo();
   //-------------------------------------------------------------
 	},
 	methods: {
 	 async getInquiryInfo()	{

    const result = (await axios.get(`/api/inquiry/${this.searchNo }`)).data[0];
        this.test(result);

 	 },
    //-------------------------------------------------------------
    async saveBoard(inquiry_no) {
        const url = "/api/inquiry";
        let param = {
          inquiry_title: this.inquiryInfo.inquiry_title,
          inquiry_content: this.inquiryInfo.inquiry_content,
          reg_date: this.inquiryInfo.reg_date,
        };
        if (inquiry_no > 0) {
          const result = (await axios.put(`${url}/${inquiry_no}`, param)).data;
          if (result.affectedRows > 0) {
            alert("정상적으로 수정되었습니다.");
            this.$router.push({	path:"/inquiryInfo",	query: {	inquiry_no:inquiry_no }	});
          } else {
            alert("정상적으로 저장되지 않았습니다.");
          }
        }
      },
 	 goToUpdateForm(inquiry_no )	{
 	  this.$router.push({	path:"/inquiryInfo",	query: {	inquiry_no:inquiry_no }	});
 	 },
    test(ress){
      this.InquiryInfo = ress;
      console.log(ress);
    }
 	},
 	components: {
 	},
};
</script>
<style scoped>
/* Style inputs with type="text", select elements and textareas */
input[type="text"],
select,
textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
button[type="button"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button[type="button"]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
