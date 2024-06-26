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
                    <DataTableComponent :data="cancelOrder" :columns="cancelColumns" />
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
import Modal from '@/components/Admin/waybill.vue'
import axios from 'axios';
    
    
export default {
    components: {
        CardComponent, DataTableComponent, Modal
    },
    data() {
        return {
            order: [],
            orderColumns :['주문번호','상품명','운송장번호','주문자ID','주소','상세주소','주문일자','주문상태'],
    
            cancelOrder: [],
            cancelColumns :['주문번호','상품명','주문자ID','주소','상세주소','취소요청일자','주문상태'],
    
            returnOrder: [],
            returnColumns :['주문번호','상품명','주문자ID','주소','상세주소','반품요청일자','주문상태'],
    
            qnaList : [],
            qnaColumns :['게시글번호','상품명','Q&A제목','회원ID','작성일','답변상태'],
    
            inquiryList : [],
            inquiryColumns :['게시글번호', '문의제목', '회원ID', '작성일', '답변상태'],
    
            modalCheck : false,
            wayBill : '',
        };
    },
    created() {
        axios.get('/api/adminOrder/orderList')
            .then(res => {
                console.log(res.data);
                this.order = res.data.list.map(item => ({
                    '주문번호': item.order_no,
                    '상품명': `${item.first_prod_name}(외 ${item.prod_cnt}건)`,
                    '운송장번호': item.waybill_no,
                    '주문자ID': item.user_id,
                    '주소' : item.addr,
                    '상세주소' : item.detail_addr,
                    '주문일자' : item.order_date,
                    '주문상태' : item.order_state
                }));
            })
            .catch(err => console.log(err));
        axios.get('/api/adminOrder/cancelList')
            .then(res => {
                console.log(res.data);
                this.cancelOrder = res.data.list.map(item => ({
                    '주문번호': item.order_no,
                    '상품명': `${item.first_prod_name}(외 ${item.prod_cnt}건)`,
                    '주문자ID': item.user_id,
                    '주소' : item.addr,
                    '상세주소' : item.detail_addr,
                    '취소요청일자' : item.cancel_req_date,
                    '주문상태' : item.order_state
                }));
            })
            .catch(err => console.log(err));
        axios.get('/api/adminOrder/returnList')
            .then(res => {
                console.log(res.data);
                this.returnOrder = res.data.list.map(item => ({
                    '주문번호': item.order_no,
                    '상품명': `${item.first_prod_name}(외 ${item.prod_cnt}건)`,
                    '주문자ID': item.user_id,
                    '주소' : item.addr,
                    '상세주소' : item.detail_addr,
                    '반품요청일자' : item.return_req_date,
                    '주문상태' : item.order_state
                }));
            })
            .catch(err => console.log(err));
        axios.get('/api/adminBoard/qnaList')
            .then(res => {
                console.log(res.data);
                this.qnaList = res.data.list.map(item => ({
                    '게시글번호': item.qna_no,
                    '상품명': item.prod_name,
                    'Q&A제목' : item.qna_title,
                    '회원ID' : item.user_id,
                    '작성일' : item.reg_date,
                    '답변상태' : item.comment_state
                }));
            })
            .catch(err => console.log(err));
    
        axios.get('/api/adminBoard/inquiryList')
            .then(res => {
                console.log(res.data);
                this.inquiryList = res.data.list.map(item => ({
                    '게시글번호': item.inquiry_no,
                    '문의제목' : item.inquiry_title,
                    '회원ID' : item.user_id,
                    '작성일' : item.reg_date,
                    '답변상태' : item.comment_state
                }));
            })
            .catch(err => console.log(err));
    
    
    },
    methods: {
      
    },
    mounted() {
    },
};
</script>
<style scoped>
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
    
.modal-content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
    
</style>