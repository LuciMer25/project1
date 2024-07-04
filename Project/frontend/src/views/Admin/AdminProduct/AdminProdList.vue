<template>
    <v-container fluid>
      <v-breadcrumbs class="mb-4">
        <v-breadcrumbs-item>상품 목록</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mb-4">
        <v-card-title>
          <v-icon left>mdi-table</v-icon>
          상품 목록
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedTopCategory"
                :items="topCategories"
                label="대분류 선택"
                item-text="ctgr_name"
                item-value="ctgr_no"
                single-line
                hide-details
                @change="filterCategories"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCategory"
                :items="filteredCategories"
                label="소분류 선택"
                item-text="ctgr_name"
                item-value="ctgr_no"
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
            :items="filteredItems"
            item-key="prod_no"
            class="elevation-1"
          >
            <template v-slot:header.prod_no>
              <th class="text-left">상품 번호</th>
            </template>
            <template v-slot:header.prod_name>
              <th class="text-left">상품명</th>
            </template>
            <template v-slot:header.price>
              <th class="text-left">가격</th>
            </template>
            <template v-slot:header.reg_date>
              <th class="text-left">상품 등록일</th>
            </template>
            <template v-slot:header.ctgr_name>
              <th class="text-left">카테고리</th>
            </template>
  
            <template v-slot:item.prod_name="{ item }">
              <span class="detailSpan" @click="goDetail(item.prod_no)">
                {{ item.prod_name }}
              </span>
            </template>
            <template v-slot:item.price="{ item }">
              {{ formatCurrency(item.price) }}원
            </template>
            <template v-slot:item.reg_date="{ item }">
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
        selectedTopCategory: null,
        selectedCategory: null,
        topCategories: [],
        categories: [],
        filteredCategories: [],
        prodList: [],
        headers: [
          { text: '상품 번호', value: 'prod_no' },
          { text: '상품명', value: 'prod_name' },
          { text: '가격', value: 'price' },
          { text: '상품 등록일', value: 'reg_date' },
          { text: '카테고리', value: 'ctgr_name' },
        ],
        prodNo: null,
      };
    },
    async created() {
      await this.fetchProductList();
      await this.fetchCategories();
    },
    computed: {
      filteredItems() {
        return this.prodList.filter((item) => {
          const matchesSearch = item.prod_name.includes(this.search) || item.ctgr_name.includes(this.search);
          const matchesCategory = this.selectedCategory ? item.ctgr_no === this.selectedCategory : true;
          return matchesSearch && matchesCategory;
        });
      },
    },
    methods: {
      async fetchProductList() {
        try {
          const res = await axios.get('/api/adminProduct/prodList');
          this.prodList = res.data.list;
        } catch (error) {
          console.error('Error fetching product list', error);
        }
      },
      async fetchCategories() {
        try {
          const res = await axios.get('/api/adminProduct/categoryList');
          this.topCategories = res.data.topCategories.map(cat => ({ ctgr_name: cat.ctgr_name, ctgr_no: cat.ctgr_no }));
          this.categories = res.data.categories.map(cat => ({ ctgr_name: cat.ctgr_name, ctgr_no: cat.ctgr_no, top_ctgr_no: cat.top_ctgr_no }));
        } catch (error) {
          console.error('Error fetching categories', error);
        }
      },
      filterCategories() {
        if (this.selectedTopCategory) {
          this.filteredCategories = this.categories
            .filter(cat => cat.top_ctgr_no === this.selectedTopCategory);
        } else {
          this.filteredCategories = [];
        }
        this.selectedCategory = null;
      },
      goDetail(prod_no) {
        this.$router.push(`prodInfo/${prod_no}`);
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    color: #1976d2; /* Vuetify 기본 색상 */
  }
  .detailSpan:hover {
    text-decoration: underline;
  }
  </style>