<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active"> </li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                1:1문의 리스트
            </div>
            <div class="card-body">
                <table ref="dataTable">
                    <thead>
                        <tr>
                            <th>게시글 번호</th>
                            <th>문의제목</th>
                            <th>회원ID</th>
                            <th>작성일</th>
                            <th>답변상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="inquiry in inquiryList">
                            <td v-text="inquiry.inquiry_no"></td> 
                            <td >
                                <button class="detailBtn" :data-inquriy-no="inquiry.inquiry_no">
                                    {{ inquiry.inquiry_title }}
                                </button>
                            </td>
                            <td v-text="inquiry.user_id"></td>
                            <td>{{  formatDate(inquiry.reg_date) }}</td>
                            <td v-text="inquiry.comment_state"></td>
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
            inquiryList : [],
            inquiryNo : null
        };
    },
    created(){
        axios.get('/api/adminBoard/inquiryAllList')
        .then(res => {
            this.inquiryList = res.data.list
            console.log(this.inquiryList);
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
                if (myTable && this.inquiryList.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            });
        },
        rebindEvents() {
            const tableBody = this.$refs.dataTable.querySelector('tbody');
            tableBody.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('detailBtn')) {
                    const inquriyNo = target.dataset.inquriyNo;
                    this.goDetail(inquriyNo);
                } 
            });
        },
        goDetail(inquiry_no){
            this.inquriyNo = inquiry_no;
            this.$router.push(`inquiryInfo/${this.inquriyNo}`)
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