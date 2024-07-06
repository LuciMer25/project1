<template>
  <header>
    <div class="top-head1">
      <RouterLink to="/">HOME</RouterLink>
      <div class="searchBox">
        <form action="search" method="get" class="search-form">
          <input v-model="keyword" type="text" class="search-bar" name="product" placeholder="검색어를 입력하세요.">
          <input type="submit" class="search-button" value="Search" >
        </form>
      </div>
      <div class="controlbox">
        <RouterLink to="/" v-if="isLoggedIn" @click.prevent="logout"><p>로그아웃</p></RouterLink>
        <RouterLink to="/login" v-else><p>로그인 |</p></RouterLink>
        <RouterLink to="/mypage"><p>마이페이지 |</p></RouterLink>
        <RouterLink to="/cart"><p>장바구니</p></RouterLink>
      </div>
    </div>
    <div class="top-head2">
      <div class="dropdown">
        <span class="dropbtn">전체 카테고리</span>
        <div class="dropdown-content">
          <template v-for="top in list" >
              <RouterLink v-bind:to="`/category/${top.parent.ctgr_no}`" 
                          @mouseover="top.isSelected = true" 
                          @mouseout="top.isSelected = false">
                {{ top.parent.ctgr_name }}
              </RouterLink>
              <div class="dropdown2" v-bind:class="{'mover' : top.isSelected}">
                <div class="dropdown-content2">
                  <RouterLink v-bind:to="`/category/${top.parent.ctgr_no}/${category.ctgr_no}`"
                    :key="i"
                    v-for="(category, i) in top.childList"
                  >
                      {{ category.ctgr_name }}
                    </RouterLink>
                </div> 
              </div>
          </template>
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

import axios from "axios";
import { RouterLink } from "vue-router";
import { mapActions, mapGetters } from "vuex";
export default {
data() {
  return {
    list : [],
    keyword: '',
  };
},
created() {
  this.getcategoryList();
  this.keyword = this.$route.query.keyword;
},
computed: {
  ...mapGetters(["isLoggedIn"])
},
methods: {
  async getcategoryList() {
    let result = await axios.get(`/api/category`);


    let obj = { parent : result.data.UpResult1[0], childList :  result.data.DownResult1, isSelected : false };
    this.list.push(obj);
    obj = { parent : result.data.UpResult2[0], childList :  result.data.DownResult2, isSelected : false };
    this.list.push(obj);
    obj = { parent : result.data.UpResult3[0], childList :  result.data.DownResult3, isSelected : false };
    this.list.push(obj);
    obj = { parent : result.data.UpResult4[0], childList :  result.data.DownResult4, isSelected : false };
    this.list.push(obj);
    obj = { parent : result.data.UpResult5[0], childList :  result.data.DownResult5, isSelected : false };
    this.list.push(obj);

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
      sessionStorage.removeItem('user_resp');
    // 로그인 상태 false로 설정
    this.logoutUser(); // Vuex 액션 호출
    // 로그아웃 후 원하는 경로로 리다이렉트 등의 추가 작업 수행 가능
    // window.location.href = '/logout'; // 예시
  }  
}, // end of methods

} // end of default

</script>

<!-- <style>
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

.menu a:hover{
  color:red;
}

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

</style> -->
