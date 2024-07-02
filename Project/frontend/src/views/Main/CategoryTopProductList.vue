<template>
  <div class="container">
    <CategoryMenu 
        :topCtgrNo="top_ctgr_no"
        @subcategory-selected="handleSubCategorySelected">
    </CategoryMenu>
    <CategoryContent 
        :productsCount="newProduct.length" 
        :itemsPerPage="itemsPerPage" 
        @sort="sortProducts" 
        @update-items-per-page="updateItemsPerPage" />
    <div class="row">
      <ProductCard v-for="(product, index) in paginatedProducts" 
        :key="index" 
        :product="product" 
        :rank="index" />
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @change-page="changePage" />
  </div>
</template>

<script>
import axios from 'axios';
import CategoryContent from "../../components/product/CategoryContent.vue";
import ProductCard from "../../components/product/ProductCard.vue";
import Pagination from "../../components/Pagination.vue";
import CategoryMenu from "../../components/product/CategoryMenu.vue";
export default {
  props: {
    top_ctgr_no: {
      type: Number,
      required: true
    }
  },
  components: {
    CategoryContent,
    ProductCard,
    Pagination,
    CategoryMenu
  },
  data() {
    return {
      newProduct: [],
      newProductSorted: [],
      itemsPerPage: 8,
      currentPage: 1,
      selectedSubCtgrNo: null // 선택된 서브 카테고리 번호 저장
    };
  },
  created() {
    this.getNewProduct(this.top_ctgr_no);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.newProductSorted.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.newProductSorted.slice(start, end);
    }
  },
  methods: {
    async getNewProduct(top_ctgr_no, sub_ctgr_no = null) {
      try {
        let url = `/api/categorylist/${top_ctgr_no}`;
        if (sub_ctgr_no) {
          url += `?sub_ctgr_no=${sub_ctgr_no}`;
        }
        let result = await axios.get(url);
        this.newProduct = result.data;
        this.newProductSorted = [...this.newProduct];
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    },
    sortProducts(type) {
      switch (type) {
        case 'popularity':
          this.newProductSorted.sort((a, b) => {
            if (a.review_avg_score > b.review_avg_score) return -1;
            if (a.review_avg_score < b.review_avg_score) return 1;
            if (a.review_cnt > b.review_cnt) return -1;
            if (a.review_cnt < b.review_cnt) return 1;
            return 0;
          });
          break;
        case 'new':
          this.newProductSorted.sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date));
          break;
        case 'old':
          this.newProductSorted.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));
          break;
        case 'lowPrice':
          this.newProductSorted.sort((a, b) => a.price - b.price);
          break;
        case 'highPrice':
          this.newProductSorted.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      this.currentPage = 1;
    },
    updateItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    handleSubCategorySelected(subcategory) {
      this.selectedSubCtgrNo = subcategory.ctgr_no; // 선택된 서브 카테고리 번호 저장
      this.getNewProduct(this.top_ctgr_no, this.selectedSubCtgrNo); // 선택된 서브 카테고리의 상품 가져오기
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

h4 {
  margin-bottom: 20px;
}

.row {
  margin-bottom: 20px;
}

.text-right {
  text-align: right;
}

.btn-outline-primary {
  margin-top: 20px;
}
</style>