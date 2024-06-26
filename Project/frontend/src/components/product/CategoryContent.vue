<template>
  <div class="row mb-3">
      <div class="col-md-6">
        <p>총 {{ totalProducts }}개의 상품이 있습니다.</p>
      </div>
      <div class="col-md-6 d-flex justify-content-end">
        <!-- 정렬 버튼 -->
        <div>
            <button type="button" class="btn btn-secondary" @click="sortByPopularity">인기 순</button>
            <button type="button" class="btn btn-secondary" @click="sortByNew">신제품 순</button>
            <button type="button" class="btn btn-secondary" @click="sortByOld">오래된 순</button>
            <button type="button" class="btn btn-secondary" @click="sortByLowPrice">낮은 가격 순</button>
            <button type="button" class="btn btn-secondary" @click="sortByHighPrice">높은 가격 순</button>
        </div>
      </div>
    </div>
</template>
    
<script>
export default{
    props: {
        productsCount: {
            type: Number,
            required: true
        }
    },
    computed: {
        totalProducts() {
            return this.productsCount;
        }
    },
    methods:{
        sortByNew(){
            this.$emit('sort', 'new');
        },
        sortByOld(){
            this.$emit('sort', 'old');
        },
        sortByLowPrice(){
            this.$emit('sort', 'lowPrice');
        },
        sortByHighPrice(){
            this.$emit('sort', 'highPrice');
        },
        sortByPopularity(){
            this.$emit('sort', 'popularity')
        }
    }
}
</script>