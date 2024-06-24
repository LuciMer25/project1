<template>
    <body class="sb-nav-fixed">
        <Header></Header>
        <div id="layoutSidenav">
            <Sidemenu></Sidemenu>
            <div id="layoutSidenav_content">
                <RouterView/>
                <Footer></Footer>
            </div>
        </div>
</body>
</template>
<script>
import Header from "@/components/Admin/Header.vue";
import Sidemenu from "@/components/Admin/Sidemenu.vue"
import Footer from "@/components/Admin/Footer.vue"
export default{
        components:{
            Header,Sidemenu, Footer
        },
        data(){
             return{}
        },
        created(){
    
        },
        methods: {
        }
    }
</script>
