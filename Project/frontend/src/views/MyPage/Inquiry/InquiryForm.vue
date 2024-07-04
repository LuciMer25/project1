<template>
  <div class="col-md-9">
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
        user_id: '',
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
      const user = sessionStorage.getItem('user_id');//this.$store.getters.getUserInfo;
        console.log('유저정보'+user);
        console.log(this.user.user_id)
        const formData = new FormData();
        formData.append('inquiry_title', this.inquiryInfo.inquiry_title);
        formData.append('inquiry_content', this.inquiryInfo.inquiry_content);
        formData.append('user_id', user.user_id);
        // const response = (await axios.post('/api/inquiry', { user_id:user.user_id }));
        // this.inquiryInfo = response.data;
            if(this.file){
                formData.append('avatar', this.file);
                console.log(this.file)
            }
            axios.post("/api/inquiry", formData, {
                headers:{
                    'Content-Type' :'multipart/form-data'
                  }
                }
              )
              .then(()=>{
                console.log(this.board)
                alert('등록되었습니다.')
                this.$router.push('/inquiryList')
            })
    },
    getToday() {
      // return this.$dateFormat("");
    },
  },
};
</script>
<style scoped>
input[type="text"],
select,
textarea {
  width: 100%; 
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  box-sizing: border-box; 
  margin-top: 6px; 
  margin-bottom: 16px; 
  resize: vertical; 
}

button[type="button"] {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


button[type="button"]:hover {
  background-color: #45a049;
}


.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
