<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="800">
      <v-card-title class="text-h5">QnA 정보</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="QnA 번호" v-model="qnaInfo.qna_no" readonly></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field  :value="formatDate(qnaInfo.reg_date)" readonly></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="작성자" v-model="qnaInfo.user_id" readonly></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="제목" v-model="qnaInfo.qna_title" readonly></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="상품번호" v-model="qnaInfo.prod_no" readonly></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="상품명" v-model="qnaInfo.prod_name" readonly></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-img :src="`/api/upload/qna/${qnaInfo.qna_img}`" alt="첨부파일" max-height="200"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea label="내용" v-model="qnaInfo.qna_content" readonly></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea label="답변 내용" v-model="qnaInfo.reply_content"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-col cols="12" sm="6">
          <v-text-field  :value="formatDate(qnaInfo.reply_reg_date)" readonly></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="text-right">
          <v-btn color="primary" @click="addOrUpdateReply">{{ qnaInfo.reply_reg_date ? '수정' : '등록' }}</v-btn>
          <v-btn color="secondary" @click="backBtn">뒤로가기</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      qnaInfo: {}
    };
  },
  created() {
    const no = this.$route.params.no;
    axios.get(`/api/adminBoard/adminQnaInfo/${no}`).then(res => {
      this.qnaInfo = res.data.list[0];
    });
  },
  methods: {
    async addOrUpdateReply() {
      try {
        if (this.qnaInfo.reply_reg_date) {
          await axios.put(`/api/adminBoard/qnaReplyUpdate`, {
            qnaNo: this.qnaInfo.qna_no,
            content: this.qnaInfo.reply_content
          });
          this.$swal('답변이 수정되었습니다.');
        } else {
          await axios.post(`/api/adminBoard/qnaReplyInsert`, {
            qnaNo: this.qnaInfo.qna_no,
            content: this.qnaInfo.reply_content
          });
          await axios.put(`/api/adminBoard/qnaStateUpdate`, {
            qnaNo: this.qnaInfo.qna_no
          });
          this.$swal('답변이 등록되었습니다.');
        }
        this.$router.go(this.$router.currentRoute);
      } catch (err) {
        console.error(err);
      }
    },
    backBtn() {
      this.$router.push(`/admin/qnaList`);
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    getImagePath(imageName) {
      if (imageName) {
        return `/api/upload/qna/${imageName}`;
      }
      return '';
    }
  }
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  text-align: center;
}
.v-img {
  width: 100%;
  height: auto;
}
</style>