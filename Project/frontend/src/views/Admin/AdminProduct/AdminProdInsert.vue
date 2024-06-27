<template>
    <v-container>
        <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab>상품등록</v-tab>
            <v-tab>상품이미지</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- 상품등록 -->
            <v-tab-item>
                <v-form>
                    <v-card class="pa-5">
                        <v-card-title>
                            <span class="headline">상품 등록</span>
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select v-model="mainCategory" label="대분류" outlined dense></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select
                                        v-model="subCategory"
                                        label="소분류"
                                        outlined
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>

                            <v-text-field
                                v-model="productName"
                                label="상품명"
                                outlined
                                dense
                                class="mt-3"
                            ></v-text-field>

                            <v-text-field
                                v-model="price"
                                label="판매가"
                                type="number"
                                outlined
                                dense
                                class="mt-3"
                            ></v-text-field>

                            <v-textarea
                                v-model="productDescription"
                                label="상품내용"
                                outlined
                                dense
                                class="mt-3"
                            ></v-textarea>
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
                            v-model="mainImage"
                            label="메인이미지 ( 썸네일 )"
                            outlined
                            prepend-icon="mdi-camera"
                            dense
                        ></v-file-input>

                        <v-file-input
                            v-model="contentImages"
                            label="내용이미지"
                            multiple
                            outlined
                            prepend-icon="mdi-camera"
                            dense
                            class="mt-3"
                        ></v-file-input>
                    </v-card-text>
                </v-card>

                <v-btn color="primary" class="mt-3" @click="submitProduct">상품등록</v-btn>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        
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