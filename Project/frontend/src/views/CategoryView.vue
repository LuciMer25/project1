<template v-for="">
  <RouterView />
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
    <!-- <li
      :key="i"
      v-for="(category, i) in TopCategoryList"
    >
      <a href="#">
        {{ category.ctgr_name }}
      </a>
      <ul> -->
        <!-- 하위 카테고리 -->
        <!-- <li
          :key="i"
           v-for="(category, i) in FirstCategory" 
        >
          <a href="#">
            {{ category.ctgr_name }}
          </a>
        </li>
      </ul>
    </li> -->
    <ul>
      <a href="#"
      :key="i"
       v-for="(category, i) in Upcategory1"
      >
        {{ category.ctgr_name }}
      </a>
      <li
      :key="i"
       v-for="(category, i) in DownCategory1"
      >
        {{ category.ctgr_name }}
        </li>
    </ul>
    
    <ul>
      <a href="#"
      :key="i"
       v-for="(category, i) in Upcategory2"
      >
        {{ category.ctgr_name }}
      </a>
      <li
      :key="i"
       v-for="(category, i) in DownCategory2"
      >
        {{ category.ctgr_name }}
      </li>
    </ul>
    
    <ul>
      <a href="#"
      :key="i"
       v-for="(category, i) in Upcategory3"
      >
        {{ category.ctgr_name }}
      </a>
      <li
      :key="i"
       v-for="(category, i) in DownCategory3"
      >
        {{ category.ctgr_name }}
      </li>
    </ul>
   
    <ul>
      <a href="#"
      :key="i"
       v-for="(category, i) in Upcategory4"
      >
        {{ category.ctgr_name }}
      </a>
      <li
      :key="i"
       v-for="(category, i) in DownCategory4"
      >
        {{ category.ctgr_name }}
      </li>
    </ul>
    
    <ul>
      <a href="#"
      :key="i"
       v-for="(category, i) in Upcategory5"
      >
        {{ category.ctgr_name }}
      </a>
      <li
      :key="i"
       v-for="(category, i) in DownCategory5"
      >
        {{ category.ctgr_name }}
    </li>
    </ul>
    
  </ul>
</aside>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        // TopCategoryList: [],
        // FirstCategory: [],
        // SecondCategory: [],
        // ----------------------------
        // Upcategory1: [],
        DownCategory1: [],
      };
    },
    created() {
      this.getcategoryList();
    },
    methods: {
      async getcategoryList() {
        let result = await axios.get(`/api/category`);

        this.Upcategory1 = result.data.UpResult1;
        this.DownCategory1 = result.data.DownResult1;
        this.Upcategory2 = result.data.UpResult2;
        this.DownCategory2 = result.data.DownResult2;
        this.Upcategory3 = result.data.UpResult3;
        this.DownCategory3 = result.data.DownResult3;
        this.Upcategory4 = result.data.UpResult4;
        this.DownCategory4 = result.data.DownResult4;
        this.Upcategory5 = result.data.UpResult5;
        this.DownCategory5 = result.data.DownResult5;

        // this.TopCategoryList = result.data.result;
        // this.BotCategoryList = result.data.result2;
        // this.TopCategoryList = result.data.result;
        // this.FirstCategory = result.data.result1;
        // this.SecondCategory = result.data.result2;
        // 상위 카테고리
        // let upctgr = result.data.result;
        // 하위 카테고리
        // let downctgr = result.data.result2;
        // upctgr.forEach((element) => console.log(element));
        // downctgr.forEach((element) => console.log(element));

        // let uctlen = result.data.result.length;
        // let dctlen = result.data.result2.length;

        // 상위카테고리 넘버
        // let upctgrno = [];
        // for(let idx in this.TopCategoryList){
        //   upctgrno += this.TopCategoryList[idx].ctgr_no;
        // }
        // console.log('상위:'+upctgrno)

        // 하위카테고리 넘버
        // let downctgrno = [];
        // for(let idx in this.BotCategoryList){
        //   downctgrno += this.BotCategoryList[idx].top_ctgr_no;
        // }
        // console.log('하위:'+downctgrno)
        
        // console.log(
        //   this.TopCategoryList.filter(x=> this.BotCategoryList.includes(x) != true)
        // )

        // console.log(upctgrno.filter(x => downctgrno.includes(x)));
        // console.log(this.TopCategoryList.filter(x => this.BotCategoryList.includes(x)));

        // forEach

        // this.BotCategoryList.forEach(ele => {
        //   console.log(ele.ctrgr_name)
        // })
    
        // console.log('확인:'+downctgrno == upctgrno)
  

        // for(let i=0; i<uctlen; i++){
        //   for(let j=0; j<dctlen; j++){
        //     if(upctgr[i].ctgr_no == downctgr[j].top_ctgr_no){
               
        //     }
        //   }             
        // }
        

        // this.BotCategoryList = result.data.result2;

      } // end of getcategortList
        
    }, // end of methods
    
  } // end of default
</script>
<style>

</style>
  