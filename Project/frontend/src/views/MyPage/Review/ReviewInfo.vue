<template>
    <div class="container">
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" class="text-center table-primary">리뷰번호</th>
              <td scope="col" class="text-center" >{{ReviewInfo.review_no}}</td>
              <th scope="col" class="text-center table-primary">평점</th>
              <td scope="col" class="text-center" ><input v-model = "ReviewInfo.score" :disabled="!isdisabled"></td>
              <th scope="col" class="text-center table-primary">작성일자</th>
              <td scope="col" class="text-center">
                {{ReviewInfo.reg_date }}
              </td>
              
                <th scope="col" class="text-center table-primary">제목</th>
                <td scope="col" class="text-center"><input v-model = "ReviewInfo.review_title" :disabled="!isdisabled"> </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="4"><img :src="`/api/upload/${ReviewInfo.review_img}`" alt="첨부파일"></td>
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
                  ><textarea v-model = "ReviewInfo.review_content" :disabled="!isdisabled"></textarea> </pre>
              </td>
            </tr>
            <br>
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
        ReviewInfo: {
          score: '',
          review_title: '',
          review_content: '',
          reg_date: '',
          review_img: '',
          order_no: '',
          prod_no: '',
        },
        isdisabled: false
      };
    },
    created() {
      this.searchNo = this.$route.query.review_no;
      this.getReviewInfo();
    },
    methods: {
      async getReviewInfo() {
        const result = (await axios.get(`/api/review/${this.searchNo}`)).data[0];
        this.ReviewInfo = result;
      },
      update() {
        this.isdisabled = true;
      },
      updatecomplete() {
        const url = `/api/review/${this.searchNo}`;
        axios.put(url, this.ReviewInfo)
          .then(() => {
            alert('수정되었습니다');
            this.$router.push('/reviewList');
          });
      },
      deletebtn() {
        axios.delete(`/api/review/${this.searchNo}`)
          .then(() => {
            alert('삭제되었습니다');
            this.$router.push('/reviewList');
          });
      }
    },
    components: {},
  };
  </script>
  