<template>
  <div class="col-md-9">
    <form @submit.prevent>
      <h3 style="font-weight: bold;">QnA등록</h3>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; width: 100%; margin-bottom: 20px;">
          <label for="QnAprodSelect" style="margin-top: 17px;">상품 선택</label>
          <select id="QnAprodSelect" v-model="qnaInfo.prod_no" style="width: 50%; margin-left: 20px;">
            <option v-for="product in qnaProduct" :key="product.prod_no" :value="product.prod_no">
              상품번호 : {{ product.prod_no }}  상품명 : {{ product.prod_name }}
            </option>
          </select>
        </div>
        <div style="display: flex; width: 100%; margin-bottom: 20px;">
          <label for="qna_title" style="margin-top: 17px">제목</label>
          <input type="text" id="qna_title" v-model="qnaInfo.qna_title" style="width: 50%; margin-left: 55px;" />
        </div>
        <div style="display: flex; width: 100%; margin-bottom: 20px;">
          <label for="qna_content">내용</label>
          <textarea id="qna_content" style="height: 200px; width: 70%; margin-left: 55px;" v-model="qnaInfo.qna_content"></textarea>
        </div>
      </div>
      <div class="form-group" style="display: flex; align-items: center;">
        <p style="margin-right: 10px; margin-top: 15px;">첨부파일</p>
        <input type="file" id="file" @change="onChangeFileUpload" style="margin-left: 10px;">
      </div>
      <button style="margin-top: 50px; margin-left: 450px;"
        type="button"
        class="btn btn-xs btn-info"
        @click="saveBoard"
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
      qnaInfo: {
        qna_title: "",
        qna_content: "",
        user_id: "",
        prod_no: "",
        qna_img: "",
      },
      qnaProduct: [],
      file: null,
    };
  },
  created() {
    this.searchNo = this.$route.query.qna_no || "";
    if (this.searchNo > 0) {
      this.getQnAInfo();
    } else {
      this.qnaInfo.reg_date = this.getToday();
    }
    this.QnAProducts();
  },
  watch: {
    $route(to, from) {
      if (to.query.qna_no !== from.query.qna_no) {
        this.searchNo = this.$route.query.qna_no || "";
        if (this.searchNo > 0) {
          this.getQnAInfo();
        } else {
          this.qnaInfo = { reg_date: this.getToday() };
        }
      }
    },
  },
  methods: {
    async QnAProducts(){
      const response = await axios.get('/api/qna/selectProdQnA');
      this.qnaProduct = response.data;
    },
    async getQnAInfo() {
      let result = await axios.get(`/api/qna/${this.searchNo}`);
      this.qnaInfo = result.data[0];
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
    },
    async saveBoard() {
      const user = sessionStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("qna_title", this.qnaInfo.qna_title);
      formData.append("qna_content", this.qnaInfo.qna_content);
      formData.append("user_id", user);
      formData.append("prod_no", this.qnaInfo.prod_no);
      if (this.file) {
        formData.append("avatar", this.file);
      }
      axios
        .post("/api/qna", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$swal("등록되었습니다.");
          this.$router.push("/qnaList");
        });
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

.col-md-9{
  margin-top: 40px;
}

hr {
      border: none; /* 기본 테두리 제거 */
      height: 3px; /* 선의 높이 (굵기) */
      background-color: #898989; /* 선의 색상 */
      margin: 20px 0; /* 위아래 여백 설정 */
    }
</style>
