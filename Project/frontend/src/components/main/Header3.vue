<template>
    <header>
      <div class="top-head1">
        <RouterLink to="/">HOME</RouterLink>
        <div class="searchBox">
          <form @submit.prevent="handleSubmit" action="search" method="get" class="search-form">
            <input v-model="keyword" type="text" class="search-bar" name="product" placeholder="검색어를 입력하세요.">
            <input type="submit" class="search-button" value="Search" >
          </form>
        </div>
        <div class="controlbox">
          <RouterLink to="/" v-if="isLoggedIn" @click.prevent="logout"><p>로그아웃 |</p></RouterLink>
          <RouterLink to="/login" v-else><p>로그인 |</p></RouterLink>
          <RouterLink to="/mypage/mypagemain"><p>마이페이지 |</p></RouterLink>
          <RouterLink to="/cart"><p>장바구니</p></RouterLink>
        </div>
      </div>
      <div class="top-head2">
  
        <div class="dropdown">
          <span class="dropbtn">전체 카테고리</span>
          <div class="dropdown-content">
            <RouterLink v-bind:to="`/category/${category.ctgr_no}`"
              :key="i"
              v-for="(category, i) in Upcategory1"
            >
              {{ category.ctgr_name }}
            </RouterLink>
            <div class="dropdown2">
                <RouterLink v-bind:to="`/category/1/${category.ctgr_no}`"
                  :key="i"
                  v-for="(category, i) in DownCategory1"
                 
                >
                    {{ category.ctgr_name }}
                  </RouterLink>
            </div>
  
            <RouterLink v-bind:to="`/category/${category.ctgr_no}`"
              :key="i"
              v-for="(category, i) in Upcategory2"
            >
              {{ category.ctgr_name }}
            </RouterLink>
            <div class="dropdown2">
                <RouterLink v-bind:to="`/category/2/${category.ctgr_no}`"
                  :key="i"
                  v-for="(category, i) in DownCategory2"
                >
                    {{ category.ctgr_name }}
                  </RouterLink>
            </div>
  
            <RouterLink v-bind:to="`/category/${category.ctgr_no}`"
              :key="i"
              v-for="(category, i) in Upcategory3"
            >
              {{ category.ctgr_name }}
            </RouterLink>
            <div class="dropdown2">
                  <RouterLink v-bind:to="`/category/3/${category.ctgr_no}`"
                  :key="i"
                  v-for="(category, i) in DownCategory3"
                  >
                    {{ category.ctgr_name }}
                  </RouterLink>
            </div>
  
            <RouterLink v-bind:to="`/category/${category.ctgr_no}`"
              :key="i"
              v-for="(category, i) in Upcategory4"
            >
              {{ category.ctgr_name }}
            </RouterLink>
            <div class="dropdown2">
                  <RouterLink v-bind:to="`/category/4/${category.ctgr_no}`"
                  :key="i"
                  v-for="(category, i) in DownCategory4"
                  >
                    {{ category.ctgr_name }}
                  </RouterLink>
            </div>
            
            <RouterLink v-bind:to="`/category/${category.ctgr_no}`"
              :key="i"
              v-for="(category, i) in Upcategory5"
            >
              {{ category.ctgr_name }}
            </RouterLink>
            <div class="dropdown2">
                  <RouterLink v-bind:to="`/category/5/${category.ctgr_no}`"
                  :key="i"
                  v-for="(category, i) in DownCategory5"
                  >
                    {{ category.ctgr_name }}
                  </RouterLink>
            </div>
  
          </div>
        </div> 
        <ul class="menu">
          <li><RouterLink to="/notify">공지사항</RouterLink></li>
          <li><RouterLink to="/QnAList">QnA</RouterLink></li>
          <li><RouterLink to="/inquiryList">1:1문의</RouterLink></li>
          <li><RouterLink to="">베스트</RouterLink></li>
        </ul>
      </div>  
    </header>
    <div class="endOfHeader"></div>
  </template>
  <script>
  
  import router from "@/router";
import axios from "axios";
  import { RouterLink } from "vue-router";
  import { mapActions, mapGetters } from "vuex";
  export default {
  data() {
    return {
      Upcategory1: [],
      DownCategory1: [],
      Upcategory2: [],
      DownCategory2: [],
      Upcategory3: [],
      DownCategory3: [],
      Upcategory4: [],
      DownCategory4: [],
      Upcategory5: [],
      DownCategory5: [],
      keyword: '',
    };
  },
  created() {
    this.getcategoryList();
    
    // this.keyword = this.$route.query.product;
    console.log(this.$route.query.product);
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    async handleSubmit(){
      this.$router.push({ name: 'search', params: { keyword: this.keyword } })
    },
    async getcategoryList() {
      let result = await axios.get(`/api/category`);
      // let result2 = await axios.get('/api/search/product', { 
      //   params: { 
      //       product: this.$route.query.product 
      //   } 
      // });
      this.Upcategory1 = result.data.UpResult1;
      this.DownCategory1 = result.data.DownResult1;
      this.Upcategory2 = result.data.UpResult2;
      this.DownCategory2 = result.data.DownResult2;
      this.Upcategory3 = result.data.UpResult3;
      this.DownCategory3 = result.data.DownResult3;
      this.Upcategory4 = result.data.UpResult4;
      this.DownCategory4 = result.data.DownResult4;
      this.Upcategory5 = result.data.UpResult5;
      this.DownCategory5 = result.data.DownResult5;
  
    }, // end of getcategortList
    submit(){
      this.$router.push(`/search/${keyword}`)
    },
    ...mapActions(["logoutUser"]),
    checkLoginStatus() {
      return sessionStorage.getItem('user_id') != null;
    },
    logout() {
      // 세션 스토리지에서 user_id 제거
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('name');
      // 로그인 상태 false로 설정
      this.logoutUser(); // Vuex 액션 호출
      // 로그아웃 후 원하는 경로로 리다이렉트 등의 추가 작업 수행 가능
      // window.location.href = '/logout'; // 예시
    }  
  }, // end of methods
  
  } // end of default
  
  </script>
  <style>
  header{
    margin-top: 20px;
  }
  .top-head1{
    width:90%;
    margin:auto;
    line-height: 50px;
    display:flex;
    justify-content: space-around;
    /* background-color: pink; */
  }
  
  .dropbtn{
    font-weight: bold;
  }
  .top-head1 a{
    text-decoration: none;
    color:black;
  }
  
  .search-form{
    margin-left:200px;
  }
  
  .search-form input:nth-child(2){
    color:white;
  }
  .search-bar{
    margin:auto;
    width:300px;
    border:1px solid black;
    padding:0 15px;
  }
  
  .search-button{
    background-color: black;
    border:1px solid black;
    padding:0 10px;
    font-weight: bold;
    border-left: none;
  }
  
  .search-button input{
    color:white;
  }
  
  .top-head1 a:hover{
    color:black;
  }
  
  .top-head2{
    width:90%;
    padding-left: 150px;
    margin:auto;
    line-height: 50px;
    display:flex;
    /* background-color: aqua; */
  }
  
  /* 전체 카테고리 */
  .dropdown{
  position : relative;
  display : inline-block;
  margin-right: 50px;
  }
  
  /* 상위 카테고리 */
  .dropdown-content{
    display : none;
    position : absolute;
    padding:10px;
    width:200px;
    z-index : 1001; 
    background-color:white;
    border:1px solid black;
  }

  .dropdown-content a{
    display : block;
    text-decoration: none;
    color:black;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  

  /* 하위 카테고리 */
  .dropdown2{
    width:300px;
    position : relative;
    left:-10px;
    padding:10px;
    display:none;
    background-color: white;
    border:1px solid black;
    z-index: 1002;
  }

  .controlbox{
    display:flex;
    /* padding:30px; */
  }
  
  .controlbox a{
    padding-right: 10px;
  }
  
  .menu ul{
    padding:0;
    margin:0;
  }
  
  .menu li{
    padding:0;
    margin:0;
    padding-right: 80px;
    float:left;
    list-style:none;
  }
  
  .menu a{
    color:black;
    text-decoration: none;
    font-weight: bold;
  }
  
  /* 헤더의 끝  */
  .endOfHeader{
    border: 1px solid black;
    margin-bottom: 40px;
  }
  
  li{
    list-style: none;
  }
  a{
    font-weight: bold;
  }
  a p {
    font-weight: bold;
  }

  .container a{
    text-decoration: none;
  }

  .menu li a:hover{
    color:red;
  }

  .dropdown-content a:hover{ 
    color:red;
  }

  .dropdown-content a:hover{
    color:blue;
  }

  .dropdown-content:hover .dropdown2{
    display:block;
  }

  </style>
  