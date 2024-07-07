<template>

      <!-- 왼쪽 사이드바 -->

      <!-- 오른쪽 리뷰목록 -->
      <div class="col-md-9">
        <h3 style="font-weight: bold">상품후기</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>리뷰번호</th>
              <th>평점</th>
              <th>제목</th>
              <th>등록날짜</th>
              <th>아이디</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="review.review_no"
              v-for="review in paginatedReviews"
              @click="goToDetail(review.review_no)"
            > 
              <td>{{ review.review_no }}</td>
              <td>{{ review.score }}</td>
              <td>{{ review.review_title }}</td>
              <td>{{ formatDate(review.reg_date) }}</td>
              <td>{{ review.user_id }}</td>
            </tr>
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click="changePage(currentPage - 1)">이전</a>
          </li>
          <li class="page-item" v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click="changePage(currentPage + 1)">다음</a>
          </li>
        </ul>
        <div class="text-right mt-3">
          <a href="reviewform" class="btn btn-primary">리뷰등록</a>
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
      reviewList: [],
      currentPage: 1,
      pageSize: 5, // 한 페이지에 보여줄 리뷰 수
      maxDisplayedPages: 5, // 페이지네이션에서 최대로 보여질 페이지 수
    };
  },
  created() {
    this.getReviewList();
  },
  methods: {
    async getReviewList() {
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        const response = await axios.get(`/api/review`, {
          params: {
            user_id: user.user_id
          }
        });
        this.reviewList = response.data;
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    },
      goToDetail(review_no) {
      this.$router.push({ path: "/reviewInfo", query: { review_no: review_no } });
    },
    changePage(page) {
      this.currentPage = page;
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
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reviewList.length / this.pageSize);
    },
    visiblePages() {
      const pageCount = Math.ceil(this.reviewList.length / this.pageSize);
      let startPage = Math.max(1, this.currentPage - Math.floor(this.maxDisplayedPages / 2));
      let endPage = Math.min(startPage + this.maxDisplayedPages - 1, pageCount);

      startPage = Math.max(1, endPage - this.maxDisplayedPages + 1);

      endPage = Math.min(pageCount, startPage + this.maxDisplayedPages - 1);

      const pages = [];
      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }
      return pages;
    },
    paginatedReviews() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.reviewList.slice(startIndex, endIndex);
    },
  },
};
</script>

<style scoped>
.table * {
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

.col-md-9{
  margin-top: 40px;
}

.btn.btn-primary{
  background-color: darkgray;
  border: darkgray;
}
</style>
