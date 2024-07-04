<template>
    <div class="container-fluid px-4">
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active"> </li>
        </ol>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                상품 Q&A 리스트
            </div>
            <div class="card-body">
                <table ref="dataTable">
                    <thead>
                        <tr>
                            <th>게시글 번호</th>
                            <th>상품명</th>
                            <th>Q&A 제목</th>
                            <th>회원ID</th>
                            <th>작성일</th>
                            <th>답변상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="qna in qnaList" :key="qna.qna_no">
                            <td v-text="qna.qna_no"></td> 
                            <td >
                                <button class="infoBtn" :data-prod-no="qna.prod_no">
                                    {{ qna.prod_name }}
                                </button>
                            </td>
                            <td >
                                <button class="detailBtn" :data-qna-no="qna.qna_no">
                                    {{ qna.qna_title }}
                                </button>
                            </td>
                            <td v-text="qna.user_id"></td>
                            <td>{{ formatDate(qna.reg_date) }}</td>
                            <td v-text="qna.comment_state"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { DataTable } from "simple-datatables";
import { nextTick } from 'vue';
import axios from 'axios'

export default{
    data() {
        return {
            dataTableInstance: null,
            qnaList : [],
            qnaNo : null
        };
    },
    created(){
        axios.get('/api/adminBoard/qnaAllList')
        .then(res => {
            this.qnaList = res.data.list
            console.log(this.qnaList);
            this.dataTable();
            this.rebindEvents();
        });
    },
    methods: {
        dataTable() {
            nextTick(() => {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
                const myTable = this.$refs.dataTable;
                if (myTable && this.qnaList.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            });
        },
        rebindEvents() {
            const tableBody = this.$refs.dataTable.querySelector('tbody');
            tableBody.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('detailBtn')) {
                    const qnaNo = target.dataset.qnaNo;
                    this.goDetail(qnaNo);
                } else if (target.classList.contains('infoBtn')) {
                    const prodNo = target.dataset.prodNo;
                    this.goInfo(prodNo);
                }
            });
        },
        goDetail(qna_no){
            this.qnaNo = qna_no;
            this.$router.push(`qnaInfo/${this.qnaNo}`)
        },
        goInfo(prod_no){
            this.prodNo = prod_no;
            this.$router.push(`prodInfo/${this.prodNo}`)
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    },

}
</script>