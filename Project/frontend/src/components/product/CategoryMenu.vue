<template>
  <div class="category-selector">
    <h1>{{ selectedTopCategory || '카테고리 이름' }}</h1>
      <h4 v-if="selectedSubCategory">{{ selectedSubCategory.ctgr_name }}</h4>
    <ul class="sub-category-list">
      <li class="subcategory-item" @click="handleTotal">전체</li>
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
    ctgrNo : {
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
    this.getCategories(this.topCtgrNo,this.ctgrNo);
  },
  methods: {
    async getCategories(topCtgrNo,ctgrNo) {
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
        }
      } catch (error) {
        console.error('하위 카테고리 목록을 가져오는 중 오류 발생:', error);
      }
    },
    async handleSubCategoryClick(subcategory) {
      this.selectedSubCategory = subcategory;
      this.$emit('subcategory-selected', subcategory); // 이벤트 발생
    },
    async handleTotal() {
      this.selectedSubCategory = null; // 선택된 하위 카테고리 초기화
      this.$emit('subcategory-selected', null); // 이벤트 발생
      await this.getCategories(this.topCtgrNo, 0); // 전체 하위 카테고리 보여주기
    }    
  },
  mounted(){

  }
};
</script>

<style scoped>
.category-selector {
  margin-top: 20px;
}
li{
  font-size : 15px;
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
  transition: background-color 0.3s ease;
}

.subcategory-item.active {
  color:red;
  font-weight: bold;
}

.subcategory-item:hover {
  background-color: #d4edda;
}
</style>