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
                <tr v-else v-for="row in data" :key="row.id">
                    <td v-for="column in columns" :key="column">
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
                    this.dataTableInstance = new DataTable(myTable);
                }
            });
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