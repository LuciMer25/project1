<template>
  <div class="container mt-5">
    <div class="card mt-4">
      <div class="card-header">
        상품 수정
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="topCategory" class="form-label">대분류</label>
            <select id="topCategory" class="form-select" v-model="product.top_ctgr_no" @change="onTopCategoryChange">
              <option v-for="category in topCategories" :key="category.ctgr_no" :value="category.ctgr_no">{{ category.ctgr_name }}</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="subCategory" class="form-label">소분류</label>
            <select id="subCategory" class="form-select" v-model="product.ctgr_no">
              <option v-for="category in filteredCategories" :key="category.ctgr_no" :value="category.ctgr_no">{{ category.ctgr_name }}</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label for="prodName" class="form-label">상품명</label>
          <input type="text" class="form-control" id="prodName" v-model="product.prod_name">
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">판매가</label>
          <input type="number" class="form-control" id="price" v-model="product.price">
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        상품 이미지
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="prodImg" class="form-label">메인이미지 ( 썸네일 )</label>
          <input type="file" class="form-control" id="prodImg" @change="file1">
        </div>

        <div class="mb-3">
          <label for="contentImg" class="form-label">내용이미지</label>
          <input type="file" class="form-control" id="contentImg" @change="file2">
        </div>
      </div>
    </div>

    <button class="btn btn-primary mt-4 me-3" @click="submitProduct(product.prod_no)">상품등록</button>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {},
      topCategories: [],
      categories: [],
      filteredCategories: [],
    };
  },
  created() {
    axios.get('/api/adminProduct/categoryList')
      .then(res => {
        this.topCategories = res.data.topCategories;
        this.categories = res.data.categories;
      })
  },
  methods: {
    onTopCategoryChange() {
      const selectCategory = this.product.top_ctgr_no;
      if (selectCategory) {
        axios.get(`/api/adminProduct/subCategory/${selectCategory}`)
          .then(res => {
            this.filteredCategories = res.data.list;
          })

      } else {
        this.filteredCategories = [];
      }
    },
    file1(event) {
      this.product.prod_img = event.target.files[0];
    },
    file2(event) {
      this.product.prod_content_img = event.target.files[0];
    },
    submitProduct() {
        const formData = new FormData();
        formData.append('prod_name', this.product.prod_name);
        formData.append('price', this.product.price);
        formData.append('ctgr_no', this.product.ctgr_no);
        if (this.product.prod_img) {
            formData.append('prodImg', this.product.prod_img);
        }
        if (this.product.prod_content_img) {
          formData.append('contentImg', this.product.prod_content_img);
        }
        
      axios.post(`/api/adminProduct/prodInsert`, formData)
        .then(res => {
          this.$swal("상품이 등록되었습니다.")
          this.$router.push(`/admin/prodList`)
        })
    },
  
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.mt-4 {
  margin-top: 20px !important;
}
.me-3 {
  margin-right: 1rem !important;
}
</style>