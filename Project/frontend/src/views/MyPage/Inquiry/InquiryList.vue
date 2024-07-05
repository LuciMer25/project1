<template>
      <!-- 오른쪽 문의목록 -->
      <div class="col-md-9">
        <a href="inquiryform">문의등록</a>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>문의번호</th>
              <th>제목</th>
              <th>작성일자</th>
              <th>답변상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="inquiry.inquiry_no"
              v-for="inquiry in paginatedInquiry"
              @click="goToDetail(inquiry.inquiry_no)">
              <td>{{ inquiry.inquiry_no }}</td>
              <td>{{ inquiry.inquiry_title }}</td>
              <td>{{ formatDate(inquiry.reg_date) }}</td>
              <td>{{ inquiry.comment_state }}</td>
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
      inquiryList: [],
      currentPage: 1,
      pageSize: 5, // 한 페이지에 보여줄 리뷰 수
      maxDisplayedPages: 5, // 페이지네이션에서 최대로 보여질 페이지 수
    };
  },
  created() {
    this.getInquiryList();
  },
  methods: {
    async getInquiryList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/inquiry`, {
          params: {
            user_id: user.user_id
          }
        });
        this.inquiryList = response.data;
      } catch (error) {
        console.error('Error fetching inquiry list:', error);
      }
    },
    goToDetail(inquiry_no) {
      this.$router.push({
        path: "/inquiryInfo",
        query: { inquiry_no: inquiry_no },
      });
    },
    formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      return Math.ceil(this.inquiryList.length / this.pageSize);
    },
    visiblePages() {
      const pageCount = Math.ceil(this.inquiryList.length / this.pageSize);
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
    paginatedInquiry() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.inquiryList.slice(startIndex, endIndex);
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
