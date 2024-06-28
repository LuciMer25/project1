<template>
  <header>
    <v-card>
      <v-layout>
        <v-app-bar color="primary" prominent>
          <!-- <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon> -->
          <a href="/">홈</a>
          <div class="ctgr">
            <v-toolbar-title @click.stop="drawer = !drawer"><h2 color="white">전체 카테고리</h2></v-toolbar-title>
          </div>
          <ul>
            <li><a href="notice">공지사항</a></li>
            <li><a href="qna">QnA</a></li>
            <li><a href="inquiry">1:1문의</a></li>
            <li><a href="best">베스트</a></li>
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
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: '라면/컵누들/곤누들', value: 'foo' },
        { title: '밥/죽/누룽지', value: 'bar' },
        { title: '카레/짜장/간편렌지', value: 'fizz' },
        { title: '소스/드레싱/양념', value: 'buzz' },
      ],
      isLoggedIn: false // 사용자 로그인 상태를 저장할 변수
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    // 페이지 로드 시 sessionStorage에서 사용자 로그인 상태 확인
    this.isLoggedIn = sessionStorage.getItem('user_id') !== null;
    
  },
  methods: {
    logout() {
      // 로그아웃 처리
      sessionStorage.removeItem('user_id'); // 세션 스토리지에서 사용자 정보 삭제
      sessionStorage.removeItem('name'); // 세션 스토리지에서 사용자 정보 삭제

      this.isLoggedIn = false; // 로그인 상태 변수 업데이트
      // 추가적으로 필요한 작업 수행
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

header {
  margin-bottom: 50px;
}

ul {
  float: left;
}

ul li {
  float: left;
  padding: 10px;
}

li a {
  color: white;
  text-decoration: none;
}

li a:hover {
  color: white;
}

a {
  text-decoration: none;
}

.ctgr:hover {
  cursor: pointer;
}

.ctgr {
  padding-left: 100px;
}

p a {
  color: white;
  text-decoration: none;
  padding: 5px;
}
</style>
