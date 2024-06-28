<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active"> </li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                상품 목록
            </div>
            <div class="card-body">
                <table ref="dataTable">
                    <thead>
                        <tr>
                            <th>상품 번호</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>상품 등록일</th>
                            <th>카테고리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in prodList">
                            <td v-text="prod.prod_no"></td> 
                            <td >
                                <button class="detailBtn" :data-prod-no="prod.prod_no">
                                    {{ prod.prod_name }}
                                </button>
                            </td>
                            <td v-text="prod.price"></td>
                            <td v-text="prod.reg_date"></td>
                            <td v-text="prod.ctgr_name"></td>
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
            prodList : [],
            prodNo : null,
        };
    },
    created(){
        axios.get('/api/adminProduct/prodList')
        .then(res => {
            this.prodList = res.data.list
            console.log(this.prodList);
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
                if (myTable && this.prodList.length > 0) {
                    this.dataTableInstance = new DataTable(myTable);
                }
            }).then(() => {
                this.rebindEvents();
            })
        },
        rebindEvents() {
            const tableBody = this.$refs.dataTable.querySelector('tbody');
            tableBody.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('detailBtn')) {
                    const prodNo = target.dataset.prodNo;
                    this.goDetail(prodNo);
                } 
            });
        },
        goDetail(prod_no){
            this.prodNo = prod_no;
            console.log(this.pronNo)
            this.$router.push(`prodInfo/${this.prodNo}`)
        }
    },

}
</script>