<!-- src/components/ReviewComponent.vue -->
<template>
    <v-row>
        <v-card>
          <v-card-title>
            <v-row align="center">
              <v-col cols="12" md="3">
                <v-rating :value="averageScore" color="yellow" dense readonly half-increments></v-rating>
              </v-col>
              <v-col cols="12" md="3">
                <span class="display-1">{{ averageScore }}</span>
              </v-col>
              <v-col cols="12" md="3">
                <span class="subtitle-1">총 {{ totalReviews }}건</span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row v-for="review in reviews" :key="review.id" class="mb-3">
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" md="2">
                      <v-rating :value="review.score" color="yellow" dense readonly></v-rating>
                    </v-col>
                    <v-col cols="12" md="8">
                      <strong>{{ review.user_id }}</strong>
                      <p>{{ review.review_content }}</p>
                      <v-img v-if="review.review_img" :src="review.review_img" max-width="100"></v-img>
                    </v-col>
                    <v-col cols="12" md="2" class="text-right">
                      <p>{{ formatDate(review.date) }}</p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
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
    data() {
      return {
        reviews: [],
        averageScore: 0,
        totalReviews: 0
      };
    },
    created() {
      this.fetchReviews();
    },
    methods: {
      fetchReviews() {
        console.log('상품번호:'+this.prodNo);
        axios.get(`/api/productreviews?prod_no=${this.prodNo}`)
          .then(response => {
            this.reviews = response.data;
            console.log(this.reviews);
            this.calculateAverageScore();
          })
          .catch(error => {
            console.error(error);
          });
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
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
  </style>