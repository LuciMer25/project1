<template>
    <v-container fluid>
      <v-breadcrumbs class="mb-4">
        <v-breadcrumbs-item>총 회원 수: {{ memberCount }}명</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mb-4">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          회원 정보
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
            :headers="columns"
            :items="filteredMembers"
            item-key="user_id"
            class="elevation-1 custom-table"
          >
            <template v-slot:header.user_id>
              <th class="text-left">회원ID</th>
            </template>
            <template v-slot:header.name>
              <th class="text-left">회원명</th>
            </template>
            <template v-slot:header.phone>
              <th class="text-left">연락처</th>
            </template>
            <template v-slot:header.post_addr>
              <th class="text-left">주소</th>
            </template>
            <template v-slot:header.post_detail_list>
              <th class="text-left">상세주소</th>
            </template>
            <template v-slot:header.birth>
              <th class="text-left">생년월일</th>
            </template>
            <template v-slot:header.user_resp>
              <th class="text-left">회원등급</th>
            </template>
            <template v-slot:header.access_date>
              <th class="text-left">최근 접속일</th>
            </template>
            <template v-slot:[`item.access_date`]="{ item }">
              {{ formatDate(item.access_date) }}
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
        member: [],
        memberCount: 0,
        columns: [
          { text: 'user_id', value: 'user_id' },
          { text: 'name', value: 'name' },
          { text: 'phone', value: 'phone' },
          { text: 'post_addr', value: 'post_addr' },
          { text: 'post_detail_list', value: 'post_detail_list' },
          { text: 'birth', value: 'birth' },
          { text: 'user_resp', value: 'user_resp' },
          { text: 'access_date', value: 'access_date' },
        ],
      };
    },
    async created() {
      await this.fetchMemberList();
      await this.fetchMemberCount();
      console.log('Headers:', this.columns);
      console.log('Members:', this.member);
    },
    computed: {
      filteredMembers() {
        return this.member.filter((mem) => {
          const searchTerm = this.search.toLowerCase();
          return (
            mem.user_id.toLowerCase().includes(searchTerm) ||
            mem.name.toLowerCase().includes(searchTerm) ||
            mem.phone.toLowerCase().includes(searchTerm) ||
            mem.post_addr.toLowerCase().includes(searchTerm) ||
            mem.post_detail_list.toLowerCase().includes(searchTerm) ||
            mem.birth.toLowerCase().includes(searchTerm) ||
            mem.user_resp.toLowerCase().includes(searchTerm) ||
            this.formatDate(mem.access_date).toLowerCase().includes(searchTerm)
          );
        });
      },
    },
    methods: {
      async fetchMemberList() {
        const response = await axios.get('/api/adminMember/memberList');
        this.member = response.data.list;
      },
      async fetchMemberCount() {
        const response = await axios.get('/api/adminMember/memberCount');
        this.memberCount = response.data.count;
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
  .custom-table .v-data-table-header th {
    display: table-cell !important;
    color: #000 !important;
    background-color: #f5f5f5 !important;
    text-align: left !important;
    padding: 8px !important;
    border-bottom: 1px solid #e0e0e0 !important;
  }
  
  .custom-table .v-data-table-header {
    background-color: #f5f5f5 !important;
  }
  
  .custom-table .v-data-table__wrapper table {
    width: 100%;
  }
  
  .custom-table .v-data-table__wrapper {
    overflow-x: auto;
  }
  </style>