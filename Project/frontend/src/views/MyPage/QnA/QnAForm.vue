<template>
    <div class="col-md-9">
      <form @submit.prevent>
        <label for="name">QnA</label>
        <input type="text" id="qna_title" v-model="qnaInfo.qna_title" />
        <textarea
          id="qna_content"
          style="height: 200px"
          v-model="qnaInfo.qna_content"
        ></textarea>
        <p>첨부파일</p>
        <input type="file" @change="onChangeFileUpload">
        <button
          type="button"
          class="btn btn-xs btn-info"
          @click="saveBoard(qnaInfo.qna_no)"
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
          qna_title: '',
          qna_content: '',
          user_id: '',
          prod_no: 2,
          qna_img: '',
        },
        file: null,
        prodImgFile : null,
        contentImgFile : null,
      };
    },
    computed: {
      regdate() {
        return this.$dateFormat(this.qnaInfo.reg_date);
      },
    },
    created() {
      this.searchNo = this.$route.query.qna_no || "";
      if (this.searchNo > 0) {
        this.getQnAInfo();
      } else {
        this.qnaInfo.reg_date = this.getToday();
      }
    },
    watch: {
      $route(to, form) {
        if (to.query.qna_no !== form.query.qna_no) {
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
      async getQnAInfo() {
        let result = await axios.get(`/api/qna/${this.searchNo}`);
        this.qnaInfo = result.data[0];
      },
      onChangeFileUpload(event) {
            this.file = event.target.files[0];
            console.log(event.target);
            console.log(this.file);
        },
      async saveBoard(no) {
        const user = sessionStorage.getItem('user_id');
        console.log('유저정보'+user);
          const formData = new FormData();
            formData.append('qna_title', this.qnaInfo.qna_title);
            formData.append('qna_content', this.qnaInfo.qna_content);
            formData.append('user_id', user);
            formData.append('prod_no', this.qnaInfo.prod_no);
            if(this.file){
                formData.append('avatar', this.file);
                console.log(this.file)
            }
            axios.post("/api/qna", formData, {
                headers:{
                    'Content-Type' :'multipart/form-data'
                }
            })
            .then(()=>{
                console.log(this.board)
                alert('등록되었습니다.')
                this.$router.push('/qnaList')
            })
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
  