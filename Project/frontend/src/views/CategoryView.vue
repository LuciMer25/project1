<template>
    <!-- <div class="container">
          <li
            :key="i"
            v-for="(category, i) in categoryList"
          >
            <a>{{ category.ctgr_name }}</a>
          </li>
    </div> -->
<aside class="side-bar">
  <section class="side-bar__icon-box">
  </section>
  <ul>
    <!-- 상위 카테고리 -->
    <li
      :key="i"
      v-for="(category, i) in TopCategoryList"
    >
      <a href="#">
        {{ category.ctgr_name }}
      </a>
      <ul>
        <!-- 하위 카테고리 -->
        <li
          :key="i"
           v-for="(category, i) in BotCategoryList" 
        >
          <a href="#">
            {{  category.ctgr_name }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</aside>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        TopCategoryList: [],
        BotCategoryList: []
      };
    },
    created() {
      this.getcategoryList();
    },
    methods: {
      async getcategoryList() {
        let result = await axios.get(`/api/category`);
      
        // this.TopCategoryList = result.data.result;
        // this.BotCategoryList = result.data.result2;
      
        // 상위 카테고리
        let upctgr = result.data.result;
        // 하위 카테고리
        let downctgr = result.data.result2;
        // upctgr.forEach((element) => console.log(element));
        // downctgr.forEach((element) => console.log(element));

        let uctlen = result.data.result.length;
        let dctlen = result.data.result2.length;
        
        for(let i=0; i<uctlen; i++){
          for(let j=0; j<dctlen; j++){
            if(upctgr[i].ctgr_no == downctgr[j].top_ctgr_no){

            }
          }
        }
        this.TopCategoryList = result.data.result;

        // this.BotCategoryList = result.data.result2;

      } // end of getcategortList
        
    }, // end of methods
    
  } // end of default
  </script>
  <style scoped>
  table * {
    text-align: center;
  }
  </style>
  