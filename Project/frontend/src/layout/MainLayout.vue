<template>
    <Header></Header>
    <RouterView/>
    <Footer></Footer>

</template>
<script>
import Header from '@/components/main/Header.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router';
export default {
    components :{
        Header, Footer
    }
}
</script>