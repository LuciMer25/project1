<template>
    <div class="category-selector">
      <h1>{{ selectedTopCategory || '카테고리 이름' }}</h1>
      <h4 v-if="selectedSubCategory">{{ selectedSubCategory.ctgr_name }}</h4>
      <ul class="sub-category-list">
        <li v-for="(subcategory, index) in subCategories"
            :key="index"
            @click="handleSubCategoryClick(subcategory)"
            :class="{ active: subcategory === selectedSubCategory }"
            class="subcategory-item">
          {{ subcategory.ctgr_name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      topCtgrNo: {
        type: Number,
        required: true
      },
      subCtgrNo: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        selectedTopCategory: '', // 선택된 상위 카테고리명
        selectedSubCategory: null, // 선택된 하위 카테고리 정보
        subCategories: [] // 하위 카테고리 목록
      };
    },
    created() {
      this.getCategories(this.topCtgrNo);
    },
    methods: {
      async getCategories(topCtgrNo) {
        try {
          let result = await axios.get(`/api/categorylist/${topCtgrNo}`);
          if (result.data.length > 0) {
            // 첫 번째 상위 카테고리의 이름 설정
            this.selectedTopCategory = result.data[0].top_ctgr_name;
  
            // 중복 제거한 하위 카테고리 목록 설정
            const subCategoriesSet = new Set(result.data.map(item => item.ctgr_name));
            this.subCategories = [...subCategoriesSet].map(category => ({
              ctgr_name: category,
              top_ctgr_no: result.data[0].top_ctgr_no,
              ctgr_no: result.data.find(item => item.ctgr_name === category).ctgr_no 
            }));
  
            // 초기 선택: 첫 번째 하위 카테고리 선택
            if (this.subCategories.length > 0) {
              this.selectedSubCategory = this.subCategories[0];
            }
          }
        } catch (error) {
          console.error('하위 카테고리 목록을 가져오는 중 오류 발생:', error);
        }
      },
      handleSubCategoryClick(subcategory) {
        // 하위 카테고리가 클릭되었을 때 실행되는 로직
        this.selectedSubCategory = subcategory;
        this.$emit('subcategory-selected', subcategory); // 이벤트 발생
      }
    }
  };
  </script>
  
  <style scoped>
  .category-selector {
    margin-top: 20px;
  }
  
  h1 {
    text-align: left;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  h4 {
    text-align: left;
    margin-bottom: 20px;
  }
  
  .sub-category-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  .subcategory-item {
    cursor: pointer;
    padding: 8px 16px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
  }
  
  .subcategory-item.active {
    background-color: #007bff;
    color: #fff;
  }
  
  .subcategory-item:hover {
    background-color: #d4edda;
  }
  </style>