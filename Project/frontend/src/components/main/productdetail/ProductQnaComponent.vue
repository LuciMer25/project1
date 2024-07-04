<template>
    <v-row justify="center" cols="auto">
      <v-col cols="12">
        <span class="subtitle-1" style="font-size: 1rem; font-weight: bold; text-align: left;">상품문의</span>
      </v-col>
      <v-card cols="auto">
        <v-card-title style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
          <v-row align="center" justify="center" class="text-center">
            <v-col cols="12">
              <span class="display-1" style="font-size: 3rem;">문의 내역</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row v-for="inquiry in paginatedInquiries" :key="inquiry.qna_no" class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" class="d-flex align-items-center">
                    <strong>{{ inquiry.user_id }}</strong>&nbsp;·&nbsp;<span>{{ formatDate(inquiry.reg_date) }}</span>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-content-between">
                    <p>{{ inquiry.qna_title }}</p>
                    <v-btn @click="toggleContent(inquiry.qna_no)">{{ inquiry.showContent ? '접기' : '열기' }}</v-btn>
                  </v-col>
                  <v-col cols="12" v-if="inquiry.showContent" class="d-flex justify-content-between">
                    <p>{{ inquiry.qna_content }}</p>
                  </v-col>
                  <v-col cols="12" v-if="inquiry.showContent&&inquiry.reply_content" class="d-flex justify-content-between" style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
                    <p><strong>답변: </strong>{{ inquiry.reply_content }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-pagination
              v-model="page"
              :length="pageCount"
              @input="onPageChange"
            ></v-pagination>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </template>
  
  <script>
  import axios from 'axios';
  import VueSweetalert2 from 'vue-sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  
  export default {
    props: {
      prodNo: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        inquiries: [],
        page: 1,
        itemsPerPage: 5,
        user_id:''
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.inquiries.length / this.itemsPerPage);
      },
      paginatedInquiries() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.inquiries.slice(start, end);
      }
    },
    created() {
        if(this.$store.getters.getUserInfo!=null){
            this.user_id = this.$store.getters.getUserInfo.user_id
        }
        this.fetchInquiries();
    },
    methods: {
      async fetchInquiries() {
        try {
          const response = (await axios.get(`/api/productqna/${this.prodNo}`));
          this.inquiries = response.data.map(inquiry => ({
            ...inquiry,
            showContent: false
          }));
        } catch (error) {
          console.error(error);
        }
      },
      formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('ko-KR', options);
        return formattedDate.replace(/\./g, '.');
      },
      onPageChange(newPage) {
        this.page = newPage;
      },
      toggleContent(qna_no) {
        const inquiry = this.inquiries.find(inquiry => inquiry.qna_no === qna_no);
        if (inquiry) {
          if (this.user_id !== inquiry.user_id) {
            this.$swal('권한이 없습니다', '본인이 작성한 글만 내용을 볼 수 있습니다.', 'warning');
          } else {
            inquiry.showContent = !inquiry.showContent;
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .display-1 {
    font-size: 2rem;
    font-weight: bold;
  }
  .subtitle-1 {
    font-size: 1rem;
  }
  </style>
  