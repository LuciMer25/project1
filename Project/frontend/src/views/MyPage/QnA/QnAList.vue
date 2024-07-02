<template>
  <div class="container-fluid">
    <div class="row">
      <!-- 왼쪽 사이드바 -->
      <div class="col-md-3">
        <MyPageSideBar />
      </div>

      <!-- 오른쪽 QnA목록 -->
      <div class="col-md-9">
        <a href="qnaform">QnA등록</a>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>QnA번호</th>
              <th>제목</th>
              <th>작성일자</th>
              <th>답변상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="qna.qna_no"
              v-for="qna in paginatedQnA"
              @click="goToDetail(qna.qna_no)"
            >
              <td>{{ qna.qna_no }}</td>
              <td>{{ qna.qna_title }}</td>
              <td>{{ qna.reg_date }}</td>
              <td>{{ qna.comment_state }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 페이지네이션 -->
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click="changePage(currentPage - 1)">이전</a>
          </li>
          <li
            class="page-item"
            v-for="page in visiblePages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a class="page-link" @click="changePage(currentPage + 1)">다음</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MyPageSideBar from "@/components/mypage/MyPageSideBar.vue";
import axios from "axios";
export default {
  components: {
    MyPageSideBar,
  },
  data() {
    return {
      qnaList: [],
      currentPage: 1,
      pageSize: 5, // 한 페이지에 보여줄 리뷰 수
      maxDisplayedPages: 5, // 페이지네이션에서 최대로 보여질 페이지 수
    };
  },
  created() {
    this.getqnaList();
  },
  methods: {
    async getqnaList() {
      let result = await axios.get(`/api/qna`);
      this.qnaList = result.data;
    },
    goToDetail(qna_no) {
      this.$router.push({ path: "/qnaInfo", query: { qna_no: qna_no } });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.qnaList.length / this.pageSize);
    },
    visiblePages() {
      const pageCount = Math.ceil(this.qnaList.length / this.pageSize);
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(this.maxDisplayedPages / 2)
      );
      let endPage = Math.min(startPage + this.maxDisplayedPages - 1, pageCount);

      startPage = Math.max(1, endPage - this.maxDisplayedPages + 1);

      endPage = Math.min(pageCount, startPage + this.maxDisplayedPages - 1);

      const pages = [];
      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }
      return pages;
    },
    paginatedQnA() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.qnaList.slice(startIndex, endIndex);
    },
  },
};
</script>
<style scoped>
table * {
  text-align: center;
}

.pagination {
  margin-top: 20px;
}

.page-item {
  cursor: pointer;
}

.page-item.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
