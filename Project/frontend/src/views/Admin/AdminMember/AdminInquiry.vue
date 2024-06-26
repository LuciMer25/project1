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
                            <td v-text="inquiry.inquiry_title"></td>
                            <td v-text="inquiry.user_id"></td>
                            <td v-text="inquiry.reg_date"></td>
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
        };
    },
    created(){
        axios.get('/api/adminBoard/inquiryAllList')
        .then(res => {
            this.inquiryList = res.data.list
            console.log(this.inquiryList);
            this.dataTable();
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
    },

}
</script>