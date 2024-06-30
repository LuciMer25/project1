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
            <li><a href="notice">공지사항</a></li>
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
export default{
  
}

  </script>
<style>
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
    } */
</style>
