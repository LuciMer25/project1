<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active"> </li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                주문 현황
            </div>
            <div class="card-body">
                <table ref="dataTable">
                    <thead>
                        <tr>
                            <th>주문 번호</th>
                            <th>상품명</th>
                            <th>주문자ID</th>
                            <th>주소</th>
                            <th>상세주소</th>
                            <th>주문취소일자</th>
                            <th>주문상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in cancelAllList">
                            <td v-text="order.order_no"></td> 
                            <td >
                                <button class="detailBtn" :data-order-no="order.order_no">
                                    {{order.first_prod_name}} (외{{order.prod_cnt}}건)
                                </button>
                            </td>
                            <td v-text="order.user_id"></td>
                            <td v-text="order.addr"></td>
                            <td v-text="order.detail_addr"></td>
                            <td >{{ formatDate(order.cancel_req_date) }}</td>
                            <td >
                                <button v-if="order.order_state === '취소요청'" class="cancelBtn" :data-order-no="order.order_no">
                                    {{ order.order_state }}
                                </button>
                                <span v-else>{{ order.order_state }}</span>
                            </td>
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
    components: {
    },
    data() {
        return {
            dataTableInstance: null,
            cancelAllList : [],
            showModal: false,
            orderNo: null
        };
    },
    created(){
        this.fetchCencelList();
    },
    methods: {
        dataTable() {
            nextTick(() => {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                    
                }
                const myTable = this.$refs.dataTable;
                if (myTable && this.cancelAllList.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            }).then(() => {
                this.rebindEvents();
            });
        },
        rebindEvents() {
            const tableBody = this.$refs.dataTable.querySelector('tbody');
            tableBody.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('cancelBtn')) {
                    const orderNo = target.dataset.orderNo;
                    this.cancelBtn(orderNo);
                } else if (target.classList.contains('detailBtn')) {
                    const orderNo = target.dataset.orderNo;
                    this.goDeatil(orderNo);
                }
            });
        },
        fetchCencelList(){
            axios.get('/api/adminOrder/cancelALLList')
                .then(res => {
                    this.cancelAllList = res.data.list;
                    this.dataTable();
                })
        },
        refreshData(){
            this.fetchCencelList();
        },
        async cancelBtn(order_no){
            this.orderNo = order_no;
            console.log(this.orderNo)
            try{
                await axios.put(`/api/adminOrder/updateCancelState/${this.orderNo}`)
                await axios.put(`/api/adminOrder/updateCancelComplete/${this.orderNo}`)
                    .then(()=> {
                        this.$swal("취소완료 되었습니다.")
                        // this.fetchCencelList();
                        this.$router.go(this.$router.currentRoute)
                        // this.refreshData();
                        
                    })
                    
            } catch (error) {
                console.log("업데이트 실패", error);
                this.$swal("업데이트 실패");
            }
        },
        goDeatil(order_no){
            this.orderNo = order_no;
            this.$router.push(`cancelDetail/${this.orderNo}`)

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