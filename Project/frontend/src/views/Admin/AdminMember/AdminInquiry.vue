<template>
    <v-container fluid>
      <v-breadcrumbs class="mb-4">
        <v-breadcrumbs-item>1:1문의 리스트</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mb-4">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          1:1문의 리스트
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="filteredInquiries"
            item-key="inquiry_no"
            class="elevation-1"
          >
            <template v-slot:header.inquiry_no>
              <th class="text-left">게시글 번호</th>
            </template>
            <template v-slot:header.inquiry_title>
              <th class="text-left">문의제목</th>
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
            <template v-slot:[`item.inquiry_title`]="{ item }">
              <span class="detailSpan" @click="goDetail(item.inquiry_no)">
                {{ item.inquiry_title }}
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
        inquiryList: [],
        headers: [
          { text: 'inquiry_no', value: 'inquiry_no' },
          { text: 'inquiry_title', value: 'inquiry_title' },
          { text: 'user_id', value: 'user_id' },
          { text: 'reg_date', value: 'reg_date' },
          { text: 'comment_state', value: 'comment_state' },
        ],
      };
    },
    created() {
      this.fetchInquiryList();
    },
    computed: {
      filteredInquiries() {
        const searchTerm = this.search.toLowerCase();
        return this.inquiryList.filter((inquiry) => {
          const inquiryTitle = inquiry.inquiry_title ? inquiry.inquiry_title.toLowerCase() : '';
          const userId = inquiry.user_id ? inquiry.user_id.toLowerCase() : '';
          const regDate = inquiry.reg_date ? this.formatDate(inquiry.reg_date).toLowerCase() : '';
          const commentState = inquiry.comment_state ? inquiry.comment_state.toLowerCase() : '';
  
          return (
            inquiryTitle.includes(searchTerm) ||
            userId.includes(searchTerm) ||
            regDate.includes(searchTerm) ||
            commentState.includes(searchTerm)
          );
        });
      },
    },
    methods: {
      async fetchInquiryList() {
        try {
          const res = await axios.get('/api/adminBoard/inquiryAllList');
          this.inquiryList = res.data.list;
        } catch (error) {
          console.error('Error fetching inquiry list', error);
        }
      },
      goDetail(inquiry_no) {
        this.$router.push(`inquiryInfo/${inquiry_no}`);
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
  .detailSpan {
    cursor: pointer;
  }
  .detailSpan:hover {
    text-decoration: underline;
  }
  </style>