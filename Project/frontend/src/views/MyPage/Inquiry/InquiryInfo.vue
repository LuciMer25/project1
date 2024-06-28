<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">문의번호</th>
            <td scope="col" class="text-center" >{{InquiryInfo.inquiry_no}}</td>
            <th scope="col" class="text-center table-primary">작성일자</th>
            <td scope="col" class="text-center">
              {{InquiryInfo.reg_date }}
            </td>
            
              <th scope="col" class="text-center table-primary">제목</th>
              <td scope="col" class="text-center"><input v-model = "InquiryInfo.inquiry_title" :disabled="!isdisabled"> </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="300">
              <pre
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                "
                ><textarea v-model = "InquiryInfo.inquiry_content" :disabled="!isdisabled"></textarea> </pre>
            </td>
          </tr>
          <br>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="300">
              <pre
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                ">{{ InquiryReply.reply_content }} </pre>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info"
              v-if= "!isdisabled" @click = "update" > 
                수정
              </button>
              <button class="btn btn-xs btn-info"
              v-else @click = "updatecomplete" > 
                수정완료
              </button>
              
              <button @click = "deletebtn">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export	default {
 	data ()	{
 	 return {
 	  searchNo:"",
 	  InquiryInfo: {
      inquiry_title: '',
      inquiry_content: '',
      reg_date: '',
    },
    InquiryReply: {
      reply_content: 'ㅇㅇ'
    },
    isdisabled: false
 	 };
 	},
 	created()	{
 	 this .searchNo =	this .$route.query.inquiry_no ;
 	 this.getInquiryInfo();
   this.getInquiryReply();
   //-------------------------------------------------------------
 	},
 	methods: {
 	 async getInquiryInfo()	{

    const result = (await axios.get(`/api/inquiry/${this.searchNo }`)).data[0];
        this.test(result);

 	 },
    async getInquiryReply()	{

    const result1 = (await axios.get(`/api/inquiryreply/${this.searchNo }`)).data[0];
        this.reply(result1);

    },
    //-------------------------------------------------------------
    // async saveBoard(no) {
    //     const url = "/api/inquiry";
    //     let param = {
    //       inquiry_title: this.inquiryInfo.inquiry_title,
    //       inquiry_content: this.inquiryInfo.inquiry_content,
    //       reg_date: this.inquiryInfo.reg_date,
    //     };
    //     if (no > 0) {
    //       const result = (await axios.put(`${url}/${inquiry_no}`, param)).data;
    //       if (result.affectedRows > 0) {
    //         alert("정상적으로 수정되었습니다.");
    //       } else {
    //         alert("정상적으로 저장되지 않았습니다.");
    //       }
    //     }
    //   },
 	//  getDateFormat(date )	{
 	//   return this .$dateFormat(date );
 	//  },
 	//  async deleteBoard(no )	{
 	//   let result =	(await axios .delete(`/api/inquiry/${this .searchNo }`)).data
 	//    .affectedRows ;
 	//   if (result ==	1 )	{
 	//    this .$router .push({	path:"/list" });
 	//   }	else {
 	//    alert("정상적으로	삭제되지	않았습니다.");
 	//   }
 	//  },
   update(){
    this.isdisabled = true;
   },
   updatecomplete(){
    // const inquirydata = {...this.InquiryInfo}
    // delete inquirydata.reg_date;
    const url = `/api/inquiry/${this.searchNo }`
    axios.put(url, this.InquiryInfo)
    .then(() => {
      alert('수정되었습니다')
      this.$router.push('/inquiryList')
    })
   },
   deletebtn(){
    axios.delete(`/api/inquiry/${this.searchNo}`)
            .then(() => {
              alert('삭제되었습니다')
              this.$router.push('/inquiryList')
            })
   },
 	//  goToUpdateForm(inquiry_no )	{
 	//   this.$router.push({	path:"/inquiryUpdate",	query: {	inquiry_no:inquiry_no }	});
 	//  },
    test(res){
      this.InquiryInfo = res;
      console.log(res);
    },
    reply(res){
      this.InquiryReply = res;
      console.log(res);
    }
 	},
 	components: {
 	},
};
</script>
