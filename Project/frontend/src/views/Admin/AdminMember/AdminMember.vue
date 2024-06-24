<template>
    <div class="container-fluid px-4">
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">관리자</li>
      </ol>
      <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                회원정보조회
            </div>
            <div class="card-body">
                <DataTableComponent :data="member" :columns="memberColumns" />
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
            member: [],
            memberColumns:['회원ID','이름','연락처','주소','상세주소','생년월일'],
        }
    },
    created() {},
    methods: {},
}

</script>