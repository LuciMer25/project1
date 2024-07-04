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
    <input type="checkbox" id="agreeCheckbox" v-model="isChecked"> <label for="agreeCheckbox">동의합니다.</label>
    
    <!-- 회원탈퇴 버튼 -->
    <button class="btn btn-xs btn-warning" @click="deleteUser" :disabled="!isChecked">회원탈퇴</button>
    
    <!-- 취소 버튼 -->
    <button @click="cancel">취소</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_id: sessionStorage.getItem('user_id'), // 현재 로그인된 사용자의 ID를 세션에서 가져옵니다.
      isChecked: false // 초기에 체크박스를 선택하지 않은 상태
    };
  },
  methods: {
    
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
          sessionStorage.removeItem('user_resp'); // 세션에서 사용자 ID를 제거합니다.
          sessionStorage.removeItem('name');

           window.location.href = '/';

          this.$router.push({ path: "/" }); // 메인 페이지로 이동합니다.
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
    },
    logout() {
      const { Kakao } = window;

      // Kakao SDK에서 로그아웃 처리
      Kakao.Auth.logout(function() {
        console.log('카카오 로그아웃 성공');
        
        // 세션 스토리지 및 Vuex 스토어에서 사용자 정보 삭제
        sessionStorage.removeItem('user_id');
        this.updateLoginInfo({ user_id: '' }); // Vuex 스토어 업데이트 예시

        // 로그아웃 후 필요한 추가 처리 (예: 홈 화면으로 이동)
        this.$router.push('/');
      }.bind(this));
    }
  }
};
 
</script>

<style scoped>
.btn {
  margin: 10px;
  padding: 10px;
  background-color: #ff9800;
  color: white;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #e68900;
}
</style>
