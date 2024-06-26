<template>
    <div class="pagination-container">
      <button
        class="btn btn-outline-primary"
        @click="$emit('change-page', currentPage - 1)"
        :disabled="currentPage === 1"
      >
        이전
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="btn btn-outline-primary"
        @click="$emit('change-page', currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        다음
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .pagination-container span {
    margin: 0 10px;
  }
  </style>