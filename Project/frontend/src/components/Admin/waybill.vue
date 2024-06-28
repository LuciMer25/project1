<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-text>
        <v-text-field v-model="wayBill" label="운송장 번호를 등록하세요" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createWayBill">생성</v-btn>
        <v-btn color="success" @click="addWayBill">등록</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="close">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    orderNo: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      wayBill: '',
      dialog: true,
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit('close');
    },
    createWayBill() {
      this.wayBill = Math.random().toString().substr(2, 13);
    },
    addWayBill() {
      console.log(this.orderNo);
      axios
        .put(`/api/adminOrder/updateWayBill/${this.orderNo}`, { wayBill: this.wayBill })
        .then(() => {
          alert('운송장 번호가 등록되었습니다.');
          console.log(this.orderNo, this.wayBill);
          this.close();
        })
        .then(() => this.$router.go(this.$router.currentRoute))
        .catch(() => {
          alert('운송장 번호 등록에 실패했습니다.');
        });
    },
  },
};
</script>

<style scoped>
.v-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>