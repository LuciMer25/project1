<template>
  <div class="col-md-9">
    <h1>회원탈퇴 페이지</h1>
    <hr>
    <p>
      탈퇴를 원하신다니 저희의 서비스나 제품에 만족을 드리지 못한 것 같아 죄송합니다.
      보다 더 나은 서비스를 제공하기 위해 불편하셨던 점이나 불만사항을 남겨주시면 적극 반영하겠습니다.
      다시 돌아오시길 기다릴게요!
    </p>
    <h3>탈퇴시 유의사항</h3>
    <ul>
      <li>회원탈퇴 시 보유하고 있는 쿠폰 및 오뚜기 마일리지가 자동 소멸되며, 복원되지 않습니다.</li>
      <li>탈퇴 즉시 개인정보는 삭제되며, 복원할 수 없습니다.</li>
      <li>탈퇴 후 동일한 아이디로 재가입이 불가능합니다. 재가입 시 새로운 아이디로 가입이 가능합니다.</li>
      <li>연결된 SNS 계정이 있는 경우 연결 해제 후 탈퇴해 주세요.</li>
      <li>진행 중인 주문/환불/교환 등이 있는 경우 해당 사유가 해소된 이후 탈퇴가 가능합니다.</li>
    </ul>
    
    <!-- 체크박스 -->
    <input type="checkbox" id="agreeCheckbox" v-model="isChecked"> <label for="agreeCheckbox">동의합니다.</label><br>
    
    <!-- 회원탈퇴 버튼 -->
    <button class="btn btn-warning" @click="deleteUser" :disabled="!isChecked">회원탈퇴</button>
    
    <!-- 취소 버튼 -->
    <button class="btn btn-secondary" @click="cancel">취소</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user_id: sessionStorage.getItem('user_id'), // 현재 로그인된 사용자의 ID를 세션에서 가져옵니다.
      isChecked: false // 초기에 체크박스를 선택하지 않은 상태
    };
  },
  methods: {
    ...mapActions(["logoutUser"]),
    async deleteUser() {
      if (!this.isChecked) {
        alert("회원탈퇴를 위해서는 반드시 동의해야 합니다.");
        return;
      } 
      if (!this.user_id) {
        alert("로그인이 필요합니다.");
        return;
      }
      try {
        const response = await axios.delete(`/api/memdelete/${this.user_id}`);
        
        if (response.data.success) {
          alert("회원 탈퇴가 정상적으로 처리되었습니다.");
          sessionStorage.removeItem('user_id'); // 세션에서 사용자 ID를 제거합니다.
          sessionStorage.removeItem('name');
          this.logoutUser();
          this.$router.push('/login'); // 로그인 페이지로 이동합니다.
        } else {
          alert("회원 탈퇴가 정상적으로 처리되지 않았습니다.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      }
    },
    
    cancel() {
      this.$router.back(); // 이전 페이지로 돌아갑니다.
    }
  }
};
</script>

<style scoped>
.col-md-9 {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

input[type="checkbox"] {
  margin-right: 10px;
  vertical-align: middle;
}

label {
  vertical-align: middle;
}

.btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-warning {
  background-color: #ff9800;
  color: white;
  border: none;
}

.btn-warning:hover {
  background-color: #e68900;
}

.btn-secondary {
  background-color: #ccc;
  color: #333;
  border: none;
}

.btn-secondary:hover {
  background-color: #bbb;
}
</style>
