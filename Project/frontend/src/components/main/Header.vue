
<template>
  <header>
     <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <!-- <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon> -->
          <a href="/">홈</a>

          <!-- 상단메뉴바만들기 -->
          <div class="ctgr">
            <li><a href="#"><h1>전체 카테고리</h1></a></li>
              <ul>
                <!-- <li><a href="#">sub menu1</a></li>
                <li><a href="#">sub menu2</a></li>
                <li><a href="#">sub menu3</a></li> -->
              </ul>
          </div>
          <ul>
            <li><RouterLink to ="notify">공지사항</RouterLink></li>
            <li><a href="qnalist">QnA</a></li>
            <li><RouterLink to="inquirylist">1:1문의</RouterLink></li>
            <li><a href="bestproductlist">베스트</a></li>
          </ul>
          <v-spacer></v-spacer>
          <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <form class="d-flex" role="search" method="get">
                <input type="search" placeholder="검색" aria-label="검색" name="search">
                <button class="btn" type="submit">검색</button>
              </form>
            </div>
          </nav>

          <template v-if="$vuetify.display.mdAndUp">
            <p>
              <a v-if="isLoggedIn" @click.prevent="logout">로그아웃</a>
              <a v-else href="login">로그인</a>
            </p>
          </template>

          <p><a href="cart">장바구니</a></p>
          <p><a v-if="isLoggedIn" href="mypage">마이페이지</a></p>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >   
          <v-list 
            :items="items"
          ></v-list>
        </v-navigation-drawer>

        <v-main style="height: 5px;">
        </v-main>
      </v-layout>
    </v-card>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      drawer: false, // 네비게이션 드로어 상태 관리
      isLoggedIn: false // 로그인 상태 관리
    };
  },
  methods: {
    logout() {
      // 세션 스토리지에서 user_id 제거
      sessionStorage.removeItem('user_id');
      // 로그인 상태 false로 설정
      this.isLoggedIn = false;
      // 로그아웃 후 원하는 경로로 리다이렉트 등의 추가 작업 수행 가능
      // window.location.href = '/logout'; // 예시
    }
  },
  mounted() {
    // 마운트 시 세션 스토리지에서 user_id 가져와 로그인 상태 업데이트
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      this.isLoggedIn = true;
    }
  },
  components: {
    RouterLink
  }
};
</script>

<!-- <style scoped>
/* 추가적인 스타일링 */
 header{
    z-index: 99;
    position: relative;
  }
/* ul{
    list-style-type: none;
    margin:0px;
    padding:0px;
  }
    *{
        padding:0;
        margin:0;
        list-style: none;
    }
    header{
      margin-bottom: 50px;
    }
    ul{
        float:left;
    }
    ul li{
        float:left;
        padding:10px;
    }
    li a{
        color:white;
        text-decoration: none;
    }
    li a:hover{
        color:white;
    }
    a{
        text-decoration: none;
    }
    .ctgr:hover{
        cursor: pointer;
    }
    .ctgr{
        padding-left: 100px;
    }
    p a{
        color:white;
        text-decoration: none;
        padding:5px;
    }*/
</style> -->
  