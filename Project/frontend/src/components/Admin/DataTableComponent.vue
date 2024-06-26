<template>
    <div>
        <table ref="dataTable" v-show="true">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column">{{ column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="data.length === 0">
                    <td :colspan="columns.length" class="text-center">조회 정보가 없습니다.</td>
                </tr>
                <tr v-else v-for="row in data" :key="row.id" :data-row="JSON.stringify(row)">
                    <td v-for="column in columns" :key="`${row.id}-${column}`" :data-column="column">
                        <span v-if="column === '이미지'">
                            <img :src="`/api/upload/${row['이미지']}`" alt="이미지" />
                        </span>
                        <span v-else>
                            {{ row[column] }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import { nextTick } from 'vue';

export default {
    name: 'DataTableComponent',
    props: {
        data: {
            type: Array,
            required: true,
            default: () => []
        },
        columns: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            dataTableInstance: null,
        };
    },
    mounted() {
        this.dataTable();
    },
    updated() {
        this.dataTable();
    },
    methods: {
        dataTable() {
            nextTick(() => {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
                const myTable = this.$refs.dataTable;
                if (myTable && this.data.length > 0) {
                    this.dataTableInstance = new DataTable(myTable, {
                    });
                    this.addEventListeners();
                }
            });
        },
        addEventListeners() {
            const rows = this.$refs.dataTable.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const rowData = JSON.parse(row.getAttribute('data-row'));
                row.querySelectorAll('td').forEach(cell => {
                    cell.addEventListener('click', () => {
                        const column = cell.getAttribute('data-column');
                        this.gotoInfo(column, rowData);
                    });
                });
            });
        },
        gotoInfo(column, row) {
            let pageName = '';

            switch (column) {
                case '상품명':
                    if (row.hasOwnProperty('주문일자')) {
                        pageName = 'orderList';
                    } else if (row.hasOwnProperty('취소요청일자')) {
                        pageName = 'cancelList';
                    } else if (row.hasOwnProperty('반품요청일자')) {
                        pageName = 'returnList';
                    }
                    break;
                case 'Q&A제목':
                    pageName = 'qnaList';
                    break;
                case '문의제목':
                    pageName = 'inquiry';
                    break;
                default:
                    return;  
            }
            if (pageName) {
                this.$router.push(`/admin/${pageName}`);
            }
        }
    }
};
</script>

<style scoped>
img {
    width: 100px;
    height: 100px;
}
.text-center {
    text-align: center;
}
</style>