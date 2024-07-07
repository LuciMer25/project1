<template>
  <div class="col-md-9">
    <div class="row">
      <table class="table table-bordered" style="width:90%">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">상품명</th>
            <td scope="col" class="text-center" colspan="2">{{ReviewInfo.prod_name}}</td>
            <th scope="col" class="text-center table-primary">상품이미지</th>
            <td scope="col" class="text-center" colspan="2">
              <img :src="`/api/upload/products/${ReviewInfo.prod_img}`" alt="상품 이미지" style="width: 50px; height: 50px;">
            </td>
          </tr>
          <tr>
            <th scope="col" class="text-center table-primary">리뷰번호</th>
            <td scope="col" class="text-center">{{ReviewInfo.review_no}}</td>
            <th scope="col" class="text-center table-primary">평점</th>
            <td scope="col" class="text-center">
              <input v-model="ReviewInfo.score" :disabled="!isdisabled" style="text-align: center">
            </td>
            <th scope="col" class="text-center table-primary">작성일자</th>
            <td scope="col" class="text-center">
              {{ formatDate(ReviewInfo.reg_date) }}
            </td>
          </tr>
          <tr>
            <th scope="col" class="text-center table-primary">제목</th>
            <td scope="col" colspan="5" class="text-center">
              <input v-model="ReviewInfo.review_title" :disabled="!isdisabled">
            </td>
          </tr>
          <tr>
            <th scope="col" class="text-center table-primary">첨부파일</th>
            <td colspan="5" class="text-center">
              <img :src="`/api/upload/review/${ReviewInfo.review_img}`" alt="첨부파일" style="width: 100px; height: 100px;">
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="300">
              <pre style="white-space: pre-wrap; border: none; background-color: white;">
                <textarea v-model="ReviewInfo.review_content" :disabled="!isdisabled" style="width: 100%; height: 300px"></textarea>
              </pre>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" v-if="!isdisabled" @click="update">
                수정
              </button>
              <button class="btn btn-xs btn-info" v-else @click="updatecomplete">
                수정완료
              </button>
              <button class="btn btn-danger" style="margin-left: 10px" @click="deletebtn">삭제</button>
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
          // score: '',
          // review_title: '',
          // review_content: '',
          // reg_date: '',
          // review_img: '',
          // order_no: '',
          // prod_no: '',
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
            this.$swal('수정되었습니다');
            this.$router.push('/reviewList');
          });
      },
      deletebtn() {
        axios.delete(`/api/review/${this.searchNo}`)
          .then(() => {
            this.$swal('삭제되었습니다');
            this.$router.push('/reviewList');
          });
      },
      formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    },
    components: {},
  };
  </script>
  