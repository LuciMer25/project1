<template>
    <Header3 />
    <div class="container-fluid">
        <div class="row">
      <!-- 왼쪽 사이드바 -->
      <div class="col-md-3">
        <MyPageSideBar />
      </div>
      <RouterView></RouterView>
</div>
</div>
    <Footer></Footer>
</template>
<script>
import MyPageSideBar from '@/components/mypage/MyPageSideBar.vue'
// import Header2 from '@/components/main/Header2.vue'
import Header3 from '@/components/mypage/Header3.vue'
import Footer from '@/components/mypage/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
      Header3, Footer, MyPageSideBar
    }
}
</script>