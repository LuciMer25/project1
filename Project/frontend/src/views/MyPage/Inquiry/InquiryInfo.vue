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
          <tr>
            <th>첨부파일</th>
            <td colspan="4"><img :src="`/api/upload/${InquiryInfo.inquiry_img}`" alt="첨부파일"></td>
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
<!-- 되는 스크립트 -->
<script>
import axios from "axios";
export default {
  data() {
    return {
      searchNo: "",
      InquiryInfo: {
        inquiry_title: '',
        inquiry_content: '',
        reg_date: '',
        comment_state: '',
        inquiry_img: '',
      },
      InquiryReply: {
        reply_content: '' // 기본값 설정
      },
      isdisabled: false
    };
  },
  created() {
    this.searchNo = this.$route.query.inquiry_no;
    this.getInquiryInfo();
    this.getInquiryReply();
  },
  methods: {
    async getInquiryInfo() {
      const result = (await axios.get(`/api/inquiry/${this.searchNo}`)).data[0];
      this.InquiryInfo = result;
    },
    async getInquiryReply() {
      const result1 = (await axios.get(`/api/inquiry/reply/${this.searchNo}`)).data[0];
      if (result1 && result1.reply_content) {
        this.InquiryReply.reply_content = result1.reply_content;
      } else {
        this.InquiryReply.reply_content = '답변이 아직 없습니다.';
      }
    },
    update() {
      this.isdisabled = true;
    },
    updatecomplete() {
      const url = `/api/inquiry/${this.searchNo}`;
      axios.put(url, this.InquiryInfo)
        .then(() => {
          alert('수정되었습니다');
          this.$router.push('/inquiryList');
        });
    },
    deletebtn() {
      axios.delete(`/api/inquiry/${this.searchNo}`)
        .then(() => {
          alert('삭제되었습니다');
          this.$router.push('/inquiryList');
        });
    }
  },
  components: {},
};
</script>
