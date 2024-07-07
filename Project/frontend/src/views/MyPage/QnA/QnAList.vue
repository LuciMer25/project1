<template>

      <!-- 오른쪽 QnA목록 -->
      <div class="col-md-9">
        <h3 style="font-weight: bold">QnA</h3>
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
              <td>{{ formatDate(qna.reg_date) }}</td>
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
        <div class="text-right mt-3">
        <a href="qnaform" class="btn btn-primary">QnA등록</a>
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
      try {
        const user = this.$store.getters.getUserInfo;
        console.log('유저정보:', user);
        if(user != null) {
          const response = await axios.get(`/api/qna`, {
            params: {
              user_id: user.user_id
            }
          });
          this.qnaList = response.data;
        }
        else{
          this.$swal.fire({
            title: '로그인이 필요한 서비스입니다',
            text: '로그인 페이지로 이동합니다.',
            icon: 'warning',
            confirmButtonColor: '#d33',
            confirmButtonText: '확인',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.replace('/login');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching qna list:', error);
      }
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

.col-md-9{
  margin-top: 40px;
}

.btn.btn-primary{
  background-color: darkgray;
  border: darkgray;
}

</style>
