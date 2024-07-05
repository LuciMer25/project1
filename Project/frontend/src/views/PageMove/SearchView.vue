<template>
    <div class="container">
      <p class="search"><span class="searchKeyword">"{{ product }}"</span> 검색결과</p>
        <div class="row">
            <CategoryContent
                :productsCount="newProduct.length"
                :itemsPerPage="itemsPerPage"
                @sort="sortProducts"
                @update-items-per-page="updateItemsPerPage"/>
            <ProductCard
                v-for="(product, index) in paginatedProducts"
                :key="index"
                :product="product"
                :rank="index"/>
        </div>
        <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @go-page="changePage"
            :page-size="5"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import CategoryContent from "../../components/product/CategoryContent.vue";
    import Pagination from "../../components/Pagination.vue";
    import ProductCard from "../../components/product/ProductCard.vue"
    export default {
        components: {
            CategoryContent,
            Pagination,
            ProductCard
        },
        data() {
            return {newProduct: [], newProductSorted: [], itemsPerPage: 8, currentPage: 1}
        },
        created() {
            this.getNewProduct();
        },
        computed : {
          totalPages() {
            console.log(Math.ceil(this.newProductSorted.length / this.itemsPerPage))
            return Math.ceil(this.newProductSorted.length / this.itemsPerPage);
          },
          paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.newProductSorted.slice(start, end);
          }
        },
        methods: {
            async getNewProduct() {
                console.log('받은값 :  ' + this.$route.params.keyword);
                try {
                    //  let result = await axios.get(`/api/newproduct`);
                    let result2 = await axios.get(`/api/search/product`, {
                        params: {
                            product: this.$route.params.keyword
                        }
                    });
                    console.log(result2);
                    this.newProduct = result2.data;
                    this.newProductSorted = [...this.newProduct]; // 정렬된 배열 초기화
                    this.product = this.$route.params.keyword
                } catch (error) {
                    console.error('Error fetching new products:', error);
                }
            },
            sortProducts(type) {
                switch (type) {
                    case 'popularity':
                        // 인기 순으로 정렬
                        this.newProductSorted.sort((a, b) => {
                                // 1차 정렬: score가 높은 순서대로 정렬
                                if (a.avg_score > b.avg_score) 
                                    return -1;
                                if (a.avg_score < b.avg_score) 
                                    return 1;
                                
                                // 2차 정렬: score가 같다면 리뷰 개수가 많은 순서대로 정렬
                                if (a.cnt > b.cnt) 
                                    return -1;
                                if (a.cnt < b.cnt) 
                                    return 1;
                                return 0;
                            });
                        break;
                    case 'new':
                        // 신제품 순으로 정렬
                        this.newProductSorted.sort((a, b) => new Date(a.reg_date) - new Date(b.reg_date));
                        break;
                        // 오래된 순으로 정렬
                    case 'old':
                        this.newProductSorted.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date));
                        break;
                    case 'lowPrice':
                        // 낮은 가격 순으로 정렬
                        this.newProductSorted.sort((a, b) => a.price - b.price);
                        break;
                    case 'highPrice':
                        // 높은 가격 순으로 정렬
                        this.newProductSorted.sort((a, b) => b.price - a.price);
                        break;
                    default:
                        break;
                }
                this.currentPage = 1;
            },
            gotoDetail(no) {
                this.$router.push(`product/${no}`);
            },
            updateItemsPerPage(items) {
                this.itemsPerPage = items;
                this.currentPage = 1;
            },
            changePage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                }
            }
        }
    }
</script>

<style>
.searchKeyword {
    font-size: 50px;
    color: red;
    font-weight: bold;
}
.card-body {
    text-align: left;
}
.search{
  font-size: 30px;
}

</style>