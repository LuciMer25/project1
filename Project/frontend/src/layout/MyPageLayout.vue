<template>
    <Header2/>

    <RouterView></RouterView>
    <Footer></Footer>
    <FloatingMenu></FloatingMenu>
</template>
<script>
import FloatingMenu from '@/components/main/FloatingMenu.vue'
import Header2 from '@/components/main/Header2.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
        Header2, Footer,FloatingMenu
    }
}
</script>