<template>
  <div class="container">
      <CategoryMenu 
        :topCtgrNo="top_ctgr_no"
        :ctgrNo="ctgr_no"
        @subcategory-selected="handleSubCategorySelected">
      </CategoryMenu>
      <CategoryContent
        :productsCount="newProduct.length"
        :itemsPerPage="itemsPerPage"
        @sort="sortProducts"
        @update-items-per-page="updateItemsPerPage"
      />
      <div class="row">
      <ProductCard
          v-for="(product, index) in paginatedProducts"
          :key="index"
          :product="product"
          :rank="index"
      />
    </div>
    <div class="paging">
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @go-page="changePage"
      :page-size="5"
    />
    </div>
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
    },
    ctgr_no: {
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
      selectedSubCtgrNo: null
    };
  },
  created() {
    this.getNewProduct(this.top_ctgr_no, this.ctgr_no);
  },
  computed: {
    totalPages() {
      console.log(Math.ceil(this.newProductSorted.length / this.itemsPerPage))
      return Math.ceil(this.newProductSorted.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.newProductSorted.slice(start, end);
    }
  },
  methods: {
    async getNewProduct(top_ctgr_no, ctgr_no) {
      try {
        let url = ctgr_no > 0 ? `/api/categorylist/${top_ctgr_no}/${ctgr_no}` : `/api/categorylist/${top_ctgr_no}`;
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
      if (subcategory) {
        this.selectedSubCtgrNo = subcategory.ctgr_no;
        this.getNewProduct(this.top_ctgr_no, this.selectedSubCtgrNo);
      } else {
        this.selectedSubCtgrNo = null;
        this.getNewProduct(this.top_ctgr_no, this.ctgr_no);
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  text-align: center;
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
.paging{
  margin: 0 auto; /* 가운데 정렬 */
  display: inline-block; /* 블록 요소를 인라인 블록으로 변환하여 좌우 마진을 자동으로 설정할 수 있도록 함 */
  margin-top: 20px; /* 필요한 경우 위 여백 추가 */
}
.btn-outline-primary {
  margin-top: 20px;
}
</style>