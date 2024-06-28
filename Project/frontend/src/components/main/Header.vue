<template>
    <header>
    <v-card>
      <v-layout>
       
        <v-app-bar color="primary" prominent>
          <!-- <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon> -->
          <a href="/">home</a>

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
            <li><a href="qna">QnA</a></li>
            <li><a href="inquiry">1:1문의</a></li>
            <li><a href="best">베스트</a></li>
          </ul>
          <v-spacer></v-spacer>
          <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <form class="d-flex" role="search" method="get">
            <input  type="search" placeholder="Search" aria-label="Search" name="search">
            <button class="btn" type="submit">Search</button>
            </form>
          </div>
          </nav>
          <template v-if="$vuetify.display.mdAndUp">
            <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn> -->
            <p><a href="login">로그인</a></p>
            <!-- <v-btn icon="mdi-filter" variant="text"></v-btn> -->
            <p><a href="mypage">마이페이지</a></p>
          </template>
           <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
           <p><a href="cart">장바구니</a></p>
        </v-app-bar>
        <v-main style="height: 100px;">
        </v-main>
      </v-layout>
    </v-card>
  </header>
  </template>
  <script>

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