<template>
    <div class="floating-menu">
      <ul>
        <li><a href="newproductlist">신상품</a></li>
        <li><a href="bestproductlist">베스트</a></li>
        <li v-if="showTopBtn"><a href="#" @click.prevent="scrollToTop">TOP</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FloatingMenu',
    data() {
    return {
      showTopBtn: false
    }
  },
    methods : {
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
  }
  </script>
  
  <style scoped>
  .floating-menu {
    position: fixed;
    top: 85%;
    right: 2%;
    transform: translateY(-50%);
    background-color: white;
    padding: 0.1rem;
    border-radius: 0 5px 5px 0;
  }
  
  .floating-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;


  }
  
  .floating-menu li {
    margin: 0.5rem 0;
    border : 1px solid #ccc;
    margin-top: 0px;
    margin-bottom: 0px;

  }
  
  .floating-menu a {
    color: black;
    text-decoration: none;


  }
  
  .floating-menu a:hover {
    text-decoration: underline;
  }
  </style>