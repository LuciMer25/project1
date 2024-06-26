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
                            <th>운송장번호</th>
                            <th>주문자ID</th>
                            <th>주소</th>
                            <th>상세주소</th>
                            <th>주문일자</th>
                            <th>주문상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orderAllList">
                            <td v-text="order.order_no"></td> 
                            <td >{{order.first_prod_name}} (외{{order.prod_cnt}}건)</td>
                            <td v-text="order.waybill_no"></td>
                            <td v-text="order.user_id"></td>
                            <td v-text="order.addr"></td>
                            <td v-text="order.detail_addr"></td>
                            <td v-text="order.order_date"></td>
                            <td >
                                <button v-if="order.order_state === '상품준비중'" class="modalBtn" :data-order-no="order.order_no">
                                    {{ order.order_state }}
                                </button>
                                <button v-else-if="order.order_state === '배송중'" class="stateBtn" :data-order-no="order.order_no">
                                    {{ order.order_state }}
                                </button>
                                <span v-else>{{ order.order_state }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal v-if="showModal" :orderNo="orderNo" @close="closeModal" />
    </div>
</template>
<script>
import { DataTable } from "simple-datatables";
import { nextTick } from 'vue';
import Modal from '@/components/Admin/waybill.vue'
import axios from 'axios'

export default{
    components: {
        Modal
    },
    data() {
        return {
            dataTableInstance: null,
            orderAllList : [],
            showModal: false,
            orderNo: null
        };
    },
    created(){
        this.fetchOrderList();
    },
    methods: {
        dataTable() {
            nextTick(() => {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
                const myTable = this.$refs.dataTable;
                if (myTable && this.orderAllList.length > 0) {
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
                if (target.classList.contains('modalBtn')) {
                    const orderNo = target.dataset.orderNo;
                    this.openModal(orderNo);
                } else if(target.classList.contains('stateBtn')) {
                    const orderNo = target.dataset.orderNo;
                    this.orderStateChange(orderNo);
                }
            });
        },
        openModal(order_no) {
            this.orderNo = order_no;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.orderNo = null;
        },
        fetchOrderList(){
            axios.get('/api/adminOrder/orderAllList')
                .then(res => {
                    this.orderAllList = res.data.list;
                    this.dataTable();
                })
        },
        refreshData(){
            this.fetchOrderList();
        },
        orderStateChange(order_no){
            this.orderNo = order_no;
            console.log(this.orderNo)
            axios.put(`/api/adminOrder/updateOrderState/${this.orderNo}`)
                .then(() => {
                    console.log("업데이트됨")
                })
                .then(()=> this.$router.go(this.$router.currentRoute))
                .catch(() => {
                 alert("업데이트실패");
            });
        }

    },

}
</script>