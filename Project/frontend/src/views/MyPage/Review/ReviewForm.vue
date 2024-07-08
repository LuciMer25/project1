<template>
  <div class="col-md-9">
    <form @submit.prevent>
      <h3 style="font-weight: bold;">후기등록</h3>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; width: 100%; margin-bottom: 30px;">
          <label for="prodSelect" style="margin-top: 16px">상품 선택</label>
          <select id="prodSelect" v-model="reviewInfo.prod_no" style="width: 50%; margin-left: 20px;">
            <option v-for="product in products" :key="product.prod_no" :value="product.prod_no">
              주문번호 : {{ product.order_no }}  상품명 : {{ product.prod_name }}
            </option>
          </select>
        </div>
        <div style="display: flex; width: 100%; margin-bottom: 30px;">
          <label>평점</label>
          <div style="display: flex; align-items: center; margin-left: 60px;">
            <input type="radio" id="score1" value="1" v-model="reviewInfo.score" style="margin-right: 4px" />
            <label for="score1" style="margin-right: 20px">1</label>
            <input type="radio" id="score2" value="2" v-model="reviewInfo.score" style="margin-right: 4px" />
            <label for="score2" style="margin-right: 20px">2</label>
            <input type="radio" id="score3" value="3" v-model="reviewInfo.score" style="margin-right: 4px" />
            <label for="score3" style="margin-right: 20px">3</label>
            <input type="radio" id="score4" value="4" v-model="reviewInfo.score" style="margin-right: 4px" />
            <label for="score4" style="margin-right: 20px">4</label>
            <input type="radio" id="score5" value="5" v-model="reviewInfo.score" style="margin-right: 4px" />
            <label for="score5">5</label>
          </div>
        </div>
        <div style="display: flex; width: 100%; margin-bottom: 60px;">
          <h6 style="margin-top: 19px;">제목</h6>
          <input type="text" id="review_title" v-model="reviewInfo.review_title" style="width: 50%; margin-left: 60px;" />
        </div>
        <div style="display: flex; width: 100%; margin-bottom: 30px;">
          <h6>내용</h6>
          <textarea id="review_content" style="height: 200px; width: 70%; margin-left: 60px;" v-model="reviewInfo.review_content"></textarea>
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
      reviewInfo: {
        score: "",
        review_title: "",
        review_content: "",
        user_id: "",
        review_img: "",
        order_no: "",
        prod_no: null,
      },
      products: [],
      file: null,
    };
  },
  created() {
    this.searchNo = this.$route.query.review_no || "";
    if (this.searchNo > 0) {
      this.getreviewInfo();
    } else {
      this.reviewInfo.reg_date = this.getToday();
    }
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const user = this.$store.getters.getUserInfo;
        const response = await axios.get("/api/review/reviewProductSel", {
          params: {
            user_id: user.user_id,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getreviewInfo() {
      let result = await axios.get(`/api/review/${this.searchNo}`);
      this.reviewInfo = result.data[0];
    },
    onChangeFileUpload(event) {
      this.file = event.target.files[0];
    },
    async saveBoard() {
  const user = sessionStorage.getItem("user_id");
  const formData = new FormData();
  const selectedProduct = this.products.find((product) => product.prod_no === this.reviewInfo.prod_no);

  formData.append("prod_no", this.reviewInfo.prod_no);
  formData.append("prod_name", selectedProduct.prod_name);
  formData.append("score", this.reviewInfo.score);
  formData.append("review_title", this.reviewInfo.review_title);
  formData.append("review_content", this.reviewInfo.review_content);
  formData.append("user_id", user);
  formData.append("order_no", selectedProduct.order_no);
  
  if (this.file) {
    formData.append("avatar", this.file);
  }
  
  axios.post("/api/review", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then(() => {
    this.$swal("등록되었습니다.");
    this.$router.push("/reviewList");
  });
},
    getToday() {
      // return this.$dateFormat("");
    },
  },
};
</script>

<style scoped>
/* Style inputs with type="text`, select elements and textareas */
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
</style>
