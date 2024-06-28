<template>
    <v-container>
        <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab>상품번호 : {{ product.prod_no }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- 상품등록 -->
            <v-tab-item>
                <v-form>
                    <v-card class="pa-5">
                        <v-card-title>
                            <span class="headline">상품 수정</span>
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select 
                                        v-model="product.top_ctgr_name"
                                        :items="topCategories"
                                        label="대분류"
                                        outlined
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select
                                        v-model="product.ctgr_name"
                                        :items="categories"
                                        label="소분류"
                                        outlined
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>

                            <v-text-field
                                v-model="product.prod_name"
                                label="상품명"
                                outlined
                                dense
                                class="mt-3"
                            ></v-text-field>

                            <v-text-field
                                v-model="product.price"
                                label="판매가"
                                type="number"
                                outlined
                                dense
                                class="mt-3"
                            ></v-text-field>

                            
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-tab-item>

            <!-- 상품이미지 -->
            <v-tab-item>
                <v-card class="pa-5">
                    <v-card-title>
                        <span class="headline">상품 이미지</span>
                    </v-card-title>

                    <v-card-text>
                        <v-file-input
                            v-model="product.prod_Img"
                            label="메인이미지 ( 썸네일 )"
                            outlined
                            prepend-icon="mdi-camera"
                            dense
                        ></v-file-input>

                        <v-file-input
                            v-model="product.prod_content_img"
                            label="내용이미지"
                            multiple
                            outlined
                            prepend-icon="mdi-camera"
                            dense
                            class="mt-3"
                        ></v-file-input>
                    </v-card-text>
                </v-card>

                <v-btn color="primary" class="mt-3" @click="submitProduct">상품수정</v-btn>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            product :{},
            topCategories: ['카테고리1', '카테고리2'],
            categories: ['소분류1', '소분류2'],
        };
    },
    created(){
        const no = this.$route.params.no;
        console.log(no);
        axios.get(`/api/adminProduct/prodInfo/${no}`)
        .then(res => {
            this.product = res.data.list[0];
            console.log(this.product);
        })
        // axios.get(`/api/adminProduct/categoryList`)
        // .then(res => {
        //     this.topCategories = res.data.list[0];
        //     console.log(this.topCategories)
        // })
    },
    methods: {
        submitProduct() {
           
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}
.pa-5 {
    padding: 20px !important;
}
.mt-3 {
    margin-top: 20px !important;
}
.v-card-title {
    color: #3f51b5;
    font-weight: bold;
    font-size: 24px;
}
.v-btn {
    width: 100%;
    padding: 15px;
    font-size: 18px;
}
</style>