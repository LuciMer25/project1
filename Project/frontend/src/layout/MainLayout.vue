<template>
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
    <FloatingMenu></FloatingMenu>
</template>
<script>
import FloatingMenu from '@/components/main/FloatingMenu.vue'
import Header from '@/components/main/Header.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
        Header, Footer,FloatingMenu
    }
}
</script>