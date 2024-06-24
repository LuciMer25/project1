<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">관리자</li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                1:1문의 리스트
            </div>
            <div class="card-body">
                <DataTableComponent :data="inquiryList" :columns="inquiryColumns" />
            </div>
        </div>
    </div>
</template>
<script>
import DataTableComponent from '@/components/Admin/DataTableComponent.vue'
import axios from 'axios';

export default {
    components: {
        DataTableComponent
    },
    data(){
        return{
            inquiryList: [],
            inquiryColumns: ['문의제목','회원ID','작성일','답변상태'],
        }
    },
    created() {},
    methods: {},
}

</script>