<template>
    <div class="content-header">
      <div class="total-products">
        <p>전체 {{ totalProducts }}개의 상품이 있습니다.</p>
      </div>
      <div class="sort-options">
        <div class="sort-buttons">
          <v-btn @click="sortByPopularity">인기 순</v-btn>
          <v-btn @click="sortByNew">신제품 순</v-btn>
          <v-btn @click="sortByOld">오래된 순</v-btn>
          <v-btn @click="sortByLowPrice">낮은 가격 순</v-btn>
          <v-btn @click="sortByHighPrice">높은 가격 순</v-btn>
        </div>
        <div class="items-per-page">
          <select v-model="selectedItemsPerPage" @change="updateItemsPerPage" class="form-select">
            <option :value="8">8</option>
            <option :value="12">12</option>
            <option :value="20">20</option>
          </select>
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
        },
        itemsPerPage: {
            type: Number,
            required: true
        }
    },
    data() {
    return {
      selectedItemsPerPage: this.itemsPerPage
    }},
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
        },
        updateItemsPerPage() {
        this.$emit('update-items-per-page', parseInt(this.selectedItemsPerPage));
        }
    }
}
</script>
<style scoped>

p{
  text-align: left;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.total-products {
  flex: 1;
}

.sort-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
}

.items-per-page select {
  padding: 0.375rem 1.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>