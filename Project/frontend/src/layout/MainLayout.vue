<template>
    <!-- <Header></Header> -->
     <Header2/>
    <RouterView></RouterView>
    <Footer></Footer>
    <FloatingMenu></FloatingMenu>
</template>
<script>
import FloatingMenu from '@/components/main/FloatingMenu.vue'
import Header from '@/components/main/Header.vue'
import Header2 from '@/components/main/Header2.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
        Header, Header2, Footer,FloatingMenu
    }
}
</script>
