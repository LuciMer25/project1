<template>
  <v-container fluid>
    <v-breadcrumbs class="mb-4">
      <v-breadcrumbs-item>상품 Q&A 리스트</v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="mb-4">
      <v-card-title>
        <v-icon left>mdi-table</v-icon>
        상품 Q&A 리스트
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="selectedStatus"
              :items="statuses"
              label="답변 상태 선택"
              single-line
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="filteredQnA"
          item-key="qna_no"
          class="elevation-1"
        >
          <template v-slot:header.qna_no>
            <th class="text-left">게시글 번호</th>
          </template>
          <template v-slot:header.prod_name>
            <th class="text-left">상품명</th>
          </template>
          <template v-slot:header.qna_title>
            <th class="text-left">Q&A 제목</th>
          </template>
          <template v-slot:header.user_id>
            <th class="text-left">회원ID</th>
          </template>
          <template v-slot:header.reg_date>
            <th class="text-left">작성일</th>
          </template>
          <template v-slot:header.comment_state>
            <th class="text-left">답변상태</th>
          </template>
          <template v-slot:[`item.prod_name`]="{ item }">
            <span class="infoSpan" @click="goInfo(item.prod_no)">
              {{ item.prod_name }}
            </span>
          </template>
          <template v-slot:[`item.qna_title`]="{ item }">
            <span class="detailSpan" @click="goDetail(item.qna_no)">
              {{ item.qna_title }}
            </span>
          </template>
          <template v-slot:[`item.reg_date`]="{ item }">
            {{ formatDate(item.reg_date) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      selectedStatus: null,
      statuses: ['전체', '답변 완료', '답변 대기'],
      qnaList: [],
      headers: [
        { text: '게시글 번호', value: 'qna_no' },
        { text: '상품명', value: 'prod_name' },
        { text: 'Q&A 제목', value: 'qna_title' },
        { text: '회원ID', value: 'user_id' },
        { text: '작성일', value: 'reg_date' },
        { text: '답변상태', value: 'comment_state' },
      ],
    };
  },
  created() {
    this.fetchQnAList();
  },
  computed: {
    filteredQnA() {
      const searchTerm = this.search.toLowerCase();
      return this.qnaList.filter((qna) => {
        const qnaTitle = qna.qna_title ? qna.qna_title.toLowerCase() : '';
        const prodName = qna.prod_name ? qna.prod_name.toLowerCase() : '';
        const userId = qna.user_id ? qna.user_id.toLowerCase() : '';
        const regDate = qna.reg_date ? this.formatDate(qna.reg_date).toLowerCase() : '';
        const commentState = qna.comment_state ? qna.comment_state.toLowerCase() : '';

        const matchesSearch = 
          qnaTitle.includes(searchTerm) ||
          prodName.includes(searchTerm) ||
          userId.includes(searchTerm) ||
          regDate.includes(searchTerm) ||
          commentState.includes(searchTerm);
          
        const matchesStatus = this.selectedStatus && this.selectedStatus !== '전체' 
          ? qna.comment_state === this.selectedStatus 
          : true;

        return matchesSearch && matchesStatus;
      });
    },
  },
  methods: {
    async fetchQnAList() {
      try {
        const res = await axios.get('/api/adminBoard/qnaAllList');
        this.qnaList = res.data.list;
      } catch (error) {
        console.error('Error fetching Q&A list', error);
      }
    },
    goDetail(qna_no) {
      this.$router.push(`qnaInfo/${qna_no}`);
    },
    goInfo(prod_no) {
      this.$router.push(`prodInfo/${prod_no}`);
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
};
</script>

<style scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}
.infoSpan,
.detailSpan {
  cursor: pointer;
}
.infoSpan:hover,
.detailSpan:hover {
  text-decoration: underline;
}
</style>