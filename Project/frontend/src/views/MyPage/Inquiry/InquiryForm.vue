<template>
  <div class="container">
    <form @submit.prevent>
      <label for="name">문의등록</label>
      <input type="text" id="inquiry_title" v-model="inquiryInfo.inquiry_title" />
      <textarea
        id="inquiry_content"
        style="height: 200px"
        v-model="inquiryInfo.inquiry_content"
      ></textarea>
      <p>첨부파일</p>
      <input type="file" @change="onChangeFileUpload">
      <button
        type="button"
        class="btn btn-xs btn-info"
        @click="saveBoard(inquiryInfo.inquiry_no)"
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
      inquiryInfo: {
        inquiry_title: '',
        inquiry_content: '',
        user_id: '맹',
        inquiry_img: '',
      },
      file: null,
      prodImgFile : null,
      contentImgFile : null,
    };
  },
  computed: {
    regdate() {
      return this.$dateFormat(this.inquiryInfo.reg_date);
    },
  },
  created() {
    this.searchNo = this.$route.query.inquiry_no || "";
    if (this.searchNo > 0) {
      this.getInquiryInfo();
    } else {
      this.inquiryInfo.reg_date = this.getToday();
    }
  },
  watch: {
    $route(to, form) {
      if (to.query.inquiry_no !== form.query.inquiry_no) {
        this.searchNo = this.$route.query.inquiry_no || "";
        if (this.searchNo > 0) {
          this.getInquiryInfo();
        } else {
          this.inquiryInfo = { reg_date: this.getToday() };
        }
      }
    },
  },
  methods: {
    async getInquiryInfo() {
      let result = await axios.get(`/api/inquiry/${this.searchNo}`);
      this.inquiryInfo = result.data[0];
    },
    onChangeFileUpload(event) {
          this.file = event.target.files[0];
          console.log(event.target);
          console.log(this.file);
      },
    async saveBoard(no) {
      const url = "/api/inquiry";
      // let param = {
      //   qna_title: this.qnaInfo.qna_title,
      //   qna_content: this.qnaInfo.qna_content,
      //   // reg_date: this.qnaInfo.reg_date,
      //   user_id: this.qnaInfo.user_id,
      //   prod_no: this.qnaInfo.prod_no,
      //   qna_img: this.file
      // };
      //수정
      
        // const result = (await axios.put(`${url}/${qna_no}`, param)).data;
        // if (result.affectedRows > 0) {
        //   alert("정상적으로 수정되었습니다.");
        // } else {
        //   alert("정상적으로 저장되지 않았습니다.");
        // }
        //등록
     
        // const result = (await axios.post(url, param)).data;
        const formData = new FormData();
          formData.append('inquiry_title', this.inquiryInfo.inquiry_title);
          formData.append('inquiry_content', this.inquiryInfo.inquiry_content);
          formData.append('user_id', this.inquiryInfo.user_id);
          if(this.file){
              formData.append('avatar', this.file);
              console.log(this.file)
          }
          axios.post("/api/inquiry", formData, {
              headers:{
                  'Content-Type' :'multipart/form-data'
              }
          })
          .then(()=>{
              console.log(this.board)
              alert('등록되었습니다.')
              this.$router.push('/inquiryList')
          })
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
