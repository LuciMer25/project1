<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center"> <!-- justify-content-center를 사용하여 가운데 정렬 -->
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="preBtn">Previous</a>
      </li>
      <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }">
        <a class="page-link" href="#" @click.prevent="pageBtn(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="nextBtn">Next</a>
      </li>
    </ul>
  </nav>
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
    },
    pageSize: {
      type: Number,
      default: 5 // 페이지 그룹 내의 페이지 수
    }
  },
  created() {
      console.log(this.currentPage)
      console.log(this.totalPages);
      console.log(this.pageSize);
  },
  computed: {
      
    displayedPages() {
      let startPage = Math.max(1, this.currentPage - Math.floor(this.pageSize / 2));
      let endPage = Math.min(this.totalPages, startPage + this.pageSize - 1);
      
      console.log("startpage : " + startPage)
      console.log("endpage : " + endPage)

      const pages = [];
      
      for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
      }
      
      console.log("pages : " + pages)
      
      return pages;
      }
  },
  methods: {
    pageBtn(page) {
      if (page !== '...') {
        this.$emit('go-page', page);
      }
    },
    preBtn() {
      if (this.currentPage > 1) {
        this.$emit('go-page', this.currentPage - 1);
      }
    },
    nextBtn() {
      if (this.currentPage < this.totalPages) {
        this.$emit('go-page', this.currentPage + 1);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  margin: 20px 0;
}

.page-link {
  color: #333;
  border: 0px solid red;
  border-radius: 100%;

}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.page-item.disabled .page-link {
  color: #ccc;
  pointer-events: none;
}
</style>