<template>
    <v-row>
        <v-col cols="12" class="text-center">
        <img 
        :src="img" 
        alt="상품 이미지" 
        @error="onImageError"
        :data-fallback="fallbackImg"
        style="max-height: 5000px; max-width: 1000px; object-fit: contain;"
        class="mx-auto image-with-border"
      />
      </v-col>
    </v-row>
</template>
<script>
  
    export default {
        props: {
            img: {
                type: String,
                required: true,
                default: () => ''
            },
        },
        data (){
        return {fallbackImg:'/imgs/loadfail.jpg'}
        },
        created(){

        },
        methods: {
            onImageError(event) {
          if (event && event.target) {
            event.target.src = this.fallbackImg;
          }
        },
        }
    }
</script>