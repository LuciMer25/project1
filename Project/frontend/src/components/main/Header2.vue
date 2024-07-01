<template>
    <header>
      <div class="top-head1">
        <a href="/">HOME</a>
        <div class="searchBox">
          <form>
            <input type="text" placeholder="Search">
            <button type="button">검색</button>
          </form>
        </div>
        <div class="controlbox">
          <RouterLink to="/" v-if="isLoggedIn" @click.prevent="logout"><p>로그아웃</p></RouterLink>
          <RouterLink to="/login" v-else><p>로그인</p></RouterLink>
          <RouterLink to="/mypage"><p>마이페이지</p></RouterLink>
          <RouterLink to="/cart"><p>장바구니</p></RouterLink>
        </div>
      </div>
      <div class="top-head2">

        <div class="dropdown">
          <span class="dropbtn">전체 카테고리</span>
          <div class="dropdown-content">
            <a href="#"
              :key="i"
               v-for="(category, i) in Upcategory1"
            >
              {{ category.ctgr_name }}
            </a>
            <div class="dropdown2">
              <div class="dropdown-content2">
                <li
                  :key="i"
                  v-for="(category, i) in DownCategory1"
                >
                  {{ category.ctgr_name }}
                </li>
              </div> 
            </div>
            <a href="#"
              :key="i"
               v-for="(category, i) in Upcategory2"
            >
              {{ category.ctgr_name }}
            </a>
            <a href="#"
              :key="i"
               v-for="(category, i) in Upcategory3"
            >
              {{ category.ctgr_name }}
            </a>
            <a href="#"
              :key="i"
               v-for="(category, i) in Upcategory4"
            >
              {{ category.ctgr_name }}
            </a>
            <a href="#"
              :key="i"
               v-for="(category, i) in Upcategory5"
            >
              {{ category.ctgr_name }}
            </a>
          </div>
        </div> 
        <ul class="menu">
          <li><RouterLink to="">공지사항</RouterLink>></li>
          <li><RouterLink to="/QnAList">QnA</RouterLink>></li>
          <li><RouterLink to="/inquiryList">1:1문의</RouterLink>></li>
          <li><RouterLink to="">베스트</RouterLink>></li>
        </ul>
      </div>  
    </header>
    <div class="endOfHeader"></div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      Upcategory1: [],
      DownCategory1: [],
    };
  },
  created() {
    this.getcategoryList();
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    async getcategoryList() {
      let result = await axios.get(`/api/category`);

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
  .top-head1 a{
    text-decoration: none;
    color:black;
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

  .dropdown{
  position : relative;
  display : inline-block;
  margin-right: 50px;
  }

  .dropdown2{
    /* background-color: pink; */
    width:400px;
    position : absolute;
    display : inline-block;
    margin-right: 400px;
    
  }
  .dropdown-content{
    display : none;
    position : absolute;
    padding:10px;
    width:200px;
    z-index : 1; /*다른 요소들보다 앞에 배치*/
    background-color: white;
    border:1px solid black;
  }
  .dropdown-content a{
    display : block;
    text-decoration: none;
    color:black;
  }
  .dropdown-content a:hover{
    color:red;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }

  .searchBox{
    /* border:2px solid black; */
  }

  .controlbox{
    display:flex;
    
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
  }

  .menu a{
    color:black;
  }

  .menu a:hover{
    color:red;
  }

  .endOfHeader{
    border: 1px solid black;
  }
</style>
