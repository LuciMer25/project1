<template>
  <v-container>
    <v-card class="center-card">
      <v-card-title class="center-text">
        공지사항
      </v-card-title>
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
          <span @click="goInfo(item.notice_no)" class="title-link">{{ item.title }}</span>
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
        @input="goPage">
      </v-pagination>
      <div class="button-container">
          <v-btn color="primary" dark @click="goForm">등록</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      page: 1,
      pages: 10,
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
      goInfo(notice_no){
          this.$router.push(`/admin/notifyInfo/${notice_no}`)

      },
      goForm(){
        this.$router.push('/admin/notifyInsert')
      }

  },
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.center-card {
  width: 100%;
  max-width: 800px;
}
.center-text {
  text-align: center;
}
.title-link {
  cursor: pointer;
  text-decoration: none;
}
.title-link:hover {
  text-decoration: underline;
  color: darkblue;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}
</style>