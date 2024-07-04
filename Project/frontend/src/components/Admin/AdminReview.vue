<!-- src/components/ReviewComponent.vue -->
<template>
    <v-row justify="center" cols="auto">
      <v-col cols="12">
      <span class="subtitle-1" style="font-size: 1rem; font-weight: bold; text-align: left;">상품후기</span>
    </v-col>
      <v-card cols="auto">
        <v-card-title style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <v-row  align="center" justify="center" class="text-center">
      <v-col cols="12">
        <span class="display-1" style="font-size: 3rem;">{{ averageScore }}</span>
      </v-col>
      <v-col cols="12">
        <v-rating value="5" v-model="averageScore" color="black" dense readonly half-increments></v-rating>
      </v-col>
      <v-col cols="12">
        <span class="subtitle-1" style="font-size: 1rem;">총 {{ totalReviews }}건</span>
      </v-col>
    </v-row>
  </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row v-for="review in paginatedReviews" :key="review.id" class="mb-3" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="d-flex align-items-center">
          <div class="rating-container">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.score }">&#9733;</span>
        </div>
          <span style="font-size: 1.0rem;">{{ review.score }}</span>
        </v-col>
        <v-col cols="12" class="d-flex align-items-center">
          <strong>{{ review.user_id }}</strong>&nbsp;·&nbsp;<span>{{ formatDate(review.reg_date) }}</span>
        </v-col>
        <v-col cols="12" class="d-flex justify-content-between">
          <p>{{ review.review_content }}</p>
          <v-img v-if="review.review_img" :src="`/api/upload/review/${review.review_img}`" width="100"></v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
            <v-pagination
              v-model="page"
              :length="pageCount"
              @input="onPageChange"
            ></v-pagination>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: {
      prodNo: {
        type: String,
        required: true
      }
    },
    watch: {
      prodNo: {
        immediate: true,
        handler(newVal) {
          console.log(newVal); // prodNo 값 확인
          this.fetchReviews(newVal);
        }
      }
    },
    data() {
      return {
        reviews: [],
        averageScore: 0,
        totalReviews: 0,
        page: 1,
        itemsPerPage: 5
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.totalReviews / this.itemsPerPage);
      },
      paginatedReviews() {
        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.reviews.slice(start, end);
      }
    },
    created() {
      this.fetchReviews();
    },
    methods: {
      async fetchReviews() {
        try {
          console.log(this.prodNo)
          const response = await axios.get(`/api/productreviews?prod_no=${this.prodNo}`);
          this.reviews = response.data;
          this.calculateAverageScore();
        } catch (error) {
          console.error(error);
        }
      },
    calculateAverageScore() {
      if (this.reviews.length === 0) {
        this.averageScore = 0;
        this.totalReviews = 0;
        return;
      }
      const totalScore = this.reviews.reduce((sum, review) => sum + review.score, 0);
      this.averageScore = (totalScore / this.reviews.length).toFixed(1);
      this.totalReviews = this.reviews.length;
      },
      formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(date).toLocaleDateString('ko-KR', options);
      return formattedDate.replace(/\./g, '.');
      },
      onPageChange(newPage) {
        this.page = newPage;
      }
    }
  };
  </script>
  
  <style scoped>
  .display-1 {
    font-size: 2rem;
    font-weight: bold;
  }
  .subtitle-1 {
    font-size: 1rem;
  }
  .small-rating {
    transform: scale(0.5); /* 크기 조정 */
  }
  .rating-container {
    display: flex;
    align-items: center;
  }
  
  .star {
    font-size: 1.2rem; /* 별 크기 */
    margin-right: 4px; /* 별 사이 간격 */
    color: #ccc; /* 채워지지 않은 별 색상 */
  }
  
  .star.filled {
    color: black; /* 채워진 별 색상 */
  }
  </style>
  