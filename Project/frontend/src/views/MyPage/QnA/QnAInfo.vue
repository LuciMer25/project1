<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">QnA번호</th>
            <td scope="col" class="text-center" >{{QnAInfo.qna_no}}</td>
            <th scope="col" class="text-center table-primary">작성일자</th>
            <td scope="col" class="text-center">
              {{QnAInfo.reg_date }}
            </td>
            
              <th scope="col" class="text-center table-primary">제목</th>
              <td scope="col" class="text-center"><input v-model = "QnAInfo.qna_title" :disabled="!isdisabled" cols="170" rows="25"> </td>

          </tr>
          <tr>
          <th>첨부파일</th>
          <td colspan="4"><img :src="`/api/upload/${QnAInfo.qna_img}`" alt="첨부파일"></td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <pre
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                "
                ><textarea v-model = "QnAInfo.qna_content" :disabled="!isdisabled"></textarea> </pre>
            </td>
          </tr>
          <br>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="300">
                <pre v-if="comment_state === '답변 대기'"
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                  "></pre>
                <pre v-else
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                ">{{ QnAReply.reply_content }} </pre>
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
       QnAInfo: {
          qna_title: '',
          qna_content: '',
          reg_date: '',
          comment_state: '',
          qna_img: '',
    },
    QnAReply: {
      reply_content: ''
    },
    isdisabled: false
      };
     },
     created()	{
      this.searchNo =	this.$route.query.qna_no ;
      this.getQnAInfo();
      this.getQnAReply();
     },
     methods: {
      async getQnAInfo() {
      const result = (await axios.get(`/api/qna/${this.searchNo}`)).data[0];
      this.QnAInfo = result;
    },
    async getQnAReply() {
      const result1 = (await axios.get(`/api/qna/reply/${this.searchNo}`)).data[0];
      if (result1 && result1.reply_content) {
        this.QnAReply.reply_content = result1.reply_content;
      } else {
        this.QnAReply.reply_content = '답변이 아직 없습니다.';
      }
    },
   update(){
    this.isdisabled = true;
   },
   updatecomplete(){
    const url = `/api/qna/${this.searchNo }`
    axios.put(url, this.QnAInfo)
    .then(() => {
      alert('수정되었습니다')
      this.$router.push('/qnaList')
    })
   },
   deletebtn(){
    axios.delete(`/api/qna/${this.searchNo}`)
            .then(() => {
              alert('삭제되었습니다')
              this.$router.push('/qnaList')
            })
   },
    // test(res){
    //   this.QnAInfo = res;
    //   console.log(res);
    // }
     },
     components: {
     },
};
</script>
