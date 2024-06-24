<template>
<main>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">관리자</li>
      </ol>
      <div class="row">
        <CardComponent></CardComponent>
        <CardComponent></CardComponent>
        <CardComponent></CardComponent>
        <CardComponent></CardComponent>
      </div>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                미처리 주문현황
            </div>
            <div class="card-body">
                <DataTableComponent :data="order" :columns="orderColumns" />
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                미처리 취소현황
            </div>
            <div class="card-body">
                <DataTableComponent :data="cancleOrder" :columns="cancleColumns" />
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                미처리 반품현황
            </div>
            <div class="card-body">
                <DataTableComponent :data="returnOrder" :columns="returnColumns" />
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                미답변 상품Q&A 현황
            </div>
            <div class="card-body">
                <DataTableComponent :data="qnaList" :columns="qnaColumns" />
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                미답변 1:1문의 현황
            </div>
            <div class="card-body">
                <DataTableComponent :data="inquiryList" :columns="inquiryColumns" />
            </div>
        </div>
    </div>
  </main>
</template>

<script>
import CardComponent from "@/components/Admin/CardComponent.vue"
import DataTableComponent from '@/components/Admin/DataTableComponent.vue'
import axios from 'axios';


export default {
  components: {
    CardComponent, DataTableComponent
  },
  data() {
    return {
        order: [],
        orderColumns :['주문번호','이미지','운송장번호','주문자ID','주소','상세주소','주문일자','주문상태'],

        cancleOrder: [],
        cancleColumns :['주문번호','이미지','운송장번호','주문자ID','주소','상세주소','취소일자','주문상태'],

        returnOrder: [],
        returnColumns :['주문번호','이미지','운송장번호','주문자ID','주소','상세주소','반품일자','주문상태'],

        qnaList : [],
        qnaColumns :['상품명','이미지','Q&A제목','회원ID','작성일','답변상태'],

        inquiryList : [],
        inquiryColumns :['문의제목', '회원ID', '작성일', '답변상태'],
    };
  },
  created() {},
  methods: {},
  mounted() {
  },
};
</script>