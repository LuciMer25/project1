<template>
    <v-container>
      <v-card>
        <v-card-title>
          공지사항
        </v-card-title>
        <v-card-subtitle>
          보다 유익한 쇼핑을 위해 오뚜기의 다양한 소식을 빠르게 전달해드립니다.
        </v-card-subtitle>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          hide-default-footer>
          <template v-slot:item.notice_no="{ item }">
            {{ item.notice_no }}
          </template>
          <template v-slot:item.category="{ item }">
            <v-chip v-if="item.category === '공지'" color="blue" dark>{{ item.category }}</v-chip>
            <span v-else>{{ item.category }}</span>
          </template>
          <template v-slot:item.title="{ item }">
            <v-btn text>{{ item.title }}</v-btn>
          </template>
          <template v-slot:item.reg_date="{ item }">
            {{ formatDate(item.reg_date) }}
          </template>
          <template v-slot:item.writer="{ item }">
            {{ item.writer }}
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          :length="pages"
          circle
          @input="goPage"
        ></v-pagination>
      </v-card>
    </v-container>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data () {
      return {
        page: 1,
        pages: 10, // 페이지 수
        pageUnit: 10,
        headers: [
          { text: '번호', value: 'notice_no' },
          { text: '카테고리', value: 'category' },
          { text: '제목', value: 'title' },
          { text: '날짜', value: 'reg_date' },
        ],
        items: [],
      }
    },
    created(){
      this.goPage(this.page)
    },
    watch: {
      page(newPage) {
        this.goPage(newPage);
      }
    },
    methods: {
        async goPage(page) {
        try {
          let result = await axios.get(`/api/adminBoard/notifyList`, {
            params: { page, pageUnit: this.pageUnit }
          });
          this.items = result.data.list;
          this.pages = Math.ceil(result.data.count / this.pageUnit);
          this.page = page;
        } catch (err) {
          console.log(err);
        }
      },
      formatDate(dateStr) {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },


    },
  }
  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: auto;
  }
  </style>