<template>
    <Header2/>
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
    <FloatingMenu></FloatingMenu>
</template>
<script>
import MyPageSideBar from '@/components/mypage/MyPageSideBar.vue'
import FloatingMenu from '@/components/main/FloatingMenu.vue'
import Header2 from '@/components/main/Header2.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
        Header2, Footer,FloatingMenu, MyPageSideBar
    }
}
</script>