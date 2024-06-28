<template>
    <header>
    <v-card>
      <v-layout>
       
        <v-app-bar color="primary" prominent>
          <!-- <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon> -->
          <a href="/">home</a>
          <div class="ctgr">
              <v-toolbar-title @click.stop="drawer = !drawer" ><h2 color="white">전체 카테고리</h2></v-toolbar-title>
          </div>
          <ul>
            <li><a href="notice">공지사항</a></li>
            <li><a href="qnalist">QnA</a></li>
            <li><a href="inquirylist">1:1문의</a></li>
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
            <p><a href="mypagemain">마이페이지</a></p>
          </template>
           <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
           <p><a href="cart">장바구니</a></p>
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
      data: () => ({
        drawer: false,
        group: null,
        items: [
          {
            title: '라면/컵누들/곤누들',
            value: 'foo',
          },
          {
            title: '밥/죽/누룽지',
            value: 'bar',
          },
          {
            title: '카레/짜장/간편렌지',
            value: 'fizz',
          },
          {
            title: '소스/드레싱/양념',
            value: 'buzz',
          },
        ],
      }),
  
      watch: {
        group () {
          this.drawer = false
        },
      },
    }
  </script>
<style>
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
    }
</style>