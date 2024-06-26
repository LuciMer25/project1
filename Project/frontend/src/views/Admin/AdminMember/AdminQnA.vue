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
                        <tr v-for="qna in qnaList">
                            <td v-text="qna.qna_no"></td> 
                            <td v-text="qna.prod_name"></td>
                            <td v-text="qna.qna_title"></td>
                            <td v-text="qna.user_id"></td>
                            <td v-text="qna.reg_date"></td>
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
        };
    },
    created(){
        axios.get('/api/adminBoard/qnaAllList')
        .then(res => {
            this.qnaList = res.data.list
            console.log(this.qnaList);
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
                if (myTable && this.qnaList.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            });
        },
    },

}
</script>