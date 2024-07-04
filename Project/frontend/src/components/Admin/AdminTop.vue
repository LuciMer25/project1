<template>
  <v-container>
    <v-btn
      v-if="showTopBtn"
      fab
      dark
      color="primary"
      class="floating-btn"
      @click="scrollToTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'FloatingMenu',
  data() {
    return {
      showTopBtn: false
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleScroll() {
      this.showTopBtn = window.scrollY > 100;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>