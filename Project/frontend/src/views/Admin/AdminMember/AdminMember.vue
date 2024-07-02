<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">총 회원 수: {{ memberCount }}명</li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                회원 정보
            </div>
            <div class="card-body">
                <table ref="dataTable">
                    <thead>
                        <tr>
                            <th>회원ID</th>
                            <th>회원명</th>
                            <th>연락처</th>
                            <th>주소</th>
                            <th>상세주소</th>
                            <th>생년월일</th>
                            <th>회원등급</th>
                            <th>최근 접속일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="mem in member">
                            <td v-text="mem.user_id"></td> 
                            <td v-text="mem.name"></td>
                            <td v-text="mem.phone"></td>
                            <td v-text="mem.post_addr"></td>
                            <td v-text="mem.post_detail_list"></td>
                            <td v-text="mem.birth"></td>
                            <td v-text="mem.user_resp"></td>
                            <td>{{ formatDate(mem.access_date) }}</td>                            
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
            member : [],
            memberCount : 1,
        };
    },
    async created() {
        await this.fetchMemberList();
        await this.fetchMemberCount();
    },
    methods: {
        async fetchMemberList() {
            const response = await axios.get('/api/adminMember/memberList');
            this.member = response.data.list;
            console.log(this.member);
            this.dataTable();
           
        },
        async fetchMemberCount() {
            const response = await axios.get('/api/adminMember/memberCount');
            this.memberCount = response.data.count;
            console.log(this.memberCount);
    
        },
        dataTable() {
            nextTick(() => {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
                const myTable = this.$refs.dataTable;
                if (myTable && this.member.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            });
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