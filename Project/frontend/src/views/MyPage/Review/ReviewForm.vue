<template>
  <div class="col-md-9">
    <form @submit.prevent>
      <label for="name">리뷰등록</label>
      <input
        type="text"
        id="score"
        v-model="reviewInfo.score"
        placeholder="1~5점까지 입력해주세요"/>
      <input type="text" id="review_title" v-model="reviewInfo.review_title" />
      <textarea
        id="review_content"
        style="height: 200px"
        v-model="reviewInfo.review_content"
      ></textarea>
      <p>첨부파일</p>
      <input type="file" @change="onChangeFileUpload" />
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveBoard(reviewInfo.review_no)"
      >
        저장
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      searchNo: "",
      reviewInfo: {
        score: '',
        review_title: '',
        review_content: '',
        user_id: '맹선우',
        review_img: '',
        order_no: '1',
        prod_no: 1,
      },
      file: null,
      prodImgFile: null,
      contentImgFile: null,
    };
  },
  computed: {
    regdate() {
      return this.$dateFormat(this.reviewInfo.reg_date);
    },
  },
  created() {
    this.searchNo = this.$route.query.review_no || "";
    if (this.searchNo > 0) {
      this.getreviewInfo();
    } else {
      this.reviewInfo.reg_date = this.getToday();
    }
  },
  watch: {
    $route(to, form) {
      if (to.query.review_no !== form.query.review_no) {
        this.searchNo = this.$route.query.review_no || "";
        if (this.searchNo > 0) {
          this.getreviewInfo();
        } else {
          this.reviewInfo = { reg_date: this.getToday() };
        }
      }
    },
  },
  methods: {
    async getreviewInfo() {
      let result = await axios.get(`/api/review/${this.searchNo}`);
      this.reviewInfo = result.data[0];
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
      console.log(event.target);
      console.log(this.file);
    },
    async saveBoard() {
      const url = "/api/review";
      // const result = (await axios.post(url, param)).data;
      const formData = new FormData();
      formData.append("score", this.reviewInfo.score);
      formData.append("review_title", this.reviewInfo.review_title);
      formData.append("review_content", this.reviewInfo.review_content);
      formData.append("user_id", this.reviewInfo.user_id);
      formData.append("order_no", this.reviewInfo.order_no);
      formData.append("prod_no", this.reviewInfo.prod_no);
      if (this.file) {
        formData.append("avatar", this.file);
        console.log(this.file);
      }
      axios
        .post("/api/review", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log(this.board);
          alert("등록되었습니다.");
          this.$router.push("/reviewList");
        });
      // if (result.insertId > 0) {
      //   alert("정상적으로 등록되었습니다.");
      //   //this.boardInfo.no = result.insertId;
      //   this.$router.push({ path: "/qnaList" });
      // } else {
      //   alert("정상적으로 저장되지 않았습니다.");
      // }
    },
    getToday() {
      // return this.$dateFormat("");
    },
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
