<template>
    <div class="container">
          <li
            :key="i"
            v-for="(category, i) in categoryList"
          >
            <a>{{ category.ctgr_name }}</a>
          </li>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        categoryList: [],
      };
    },
    created() {
      this.getcategoryList();
    },
    methods: {
      async getcategoryList() {
        let result = await axios.get(`/api/category`);
        this.categoryList = result.data;
      },
      goToDetail(no) {
        this.$router.push({ path: "/info", query: { no: no } });
      },
      getDateFormat(date) {
        return this.$dateFormat(date);
      },
    },
  };

  </script>
  <style scoped>
  table * {
    text-align: center;
  }
  </style>
  