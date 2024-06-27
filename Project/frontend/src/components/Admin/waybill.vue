<template>
    <div class="modal-wrap" @click.self="close">
      <div class="modal-content">
      <h3>운송장 번호를 등록하세요</h3>
      <input v-model="wayBill" placeholder="운송장 번호를 등록하세요" />
     <button @click="createWayBill">생성</button>
     <button @click="addWayBill">등록</button>
     <button @click="close">닫기</button>
   </div>
 </div>
</template>
<script>
import axios from "axios"
export default {
 props: {
   orderNo: {
    type: Number,
    required: true
   }
 },
 data(){
   return {
       wayBill : '',
   }
 },
 methods: {
   close() {
       this.$emit('close');
   },
   createWayBill(){
       this.wayBill = Math.random().toString().substr(2, 13);
   },
   addWayBill(){
      console.log(this.orderNo)
      axios.put(`/api/adminOrder/updateWayBill/${this.orderNo}`, { wayBill: this.wayBill })
        .then(() => {
          alert('운송장 번호가 등록되었습니다.');
            console.log(this.orderNo, this.wayBill);
            this.$emit('close');
        })
        .then(()=> this.$router.go(this.$router.currentRoute))
        .catch(() => {
            alert('운송장 번호 등록에 실패했습니다.');
        });
    }
  }
}
</script>
<style scoped>
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

</style>