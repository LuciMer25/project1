<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="updateUser">
    <h2>회원수정</h2>
    <div class="textForm">
      아이디<input name="loginId" type="text" class="id" v-model="user.user_id" readonly>
    </div>
    <div class="textForm">
      비밀번호 <input name="loginPw" type="password" class="pw" v-model="user.pw" placeholder="비밀번호">
    </div>
    <div class="textForm">
      비밀번호 확인<input name="loginPwConfirm" type="password" class="pw" v-model="passwordConfirm" placeholder="비밀번호 확인">
    </div>
    <div class="textForm">
      이름<input name="name" type="text" class="name" v-model="user.name" placeholder="이름">
    </div>
    <div class="textForm">
      전화번호<input name="cellphoneNo" type="number" class="cellphoneNo" v-model="user.phone" placeholder="전화번호">
    </div>
    <div class="textForm">
      <input type="text" id="sample6_postcode" v-model="user.post_no" placeholder="우편번호">
      <input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기" class="postcodeButton"><br>
      <input type="text" id="sample6_address" v-model="user.post_addr" placeholder="주소"><br>
      <input type="text" id="sample6_detailAddress" v-model="user.post_detail_list" placeholder="상세주소">
      <input type="text" id="sample6_extraAddress" placeholder="참고항목">
    </div>
    <input type="submit" class="btn" value="수정하기"/>
    <button type="button" class="btn btn-danger" @click="goToDeletePage">회원탈퇴</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        user_id: '',
        pw: '',
        name: '',
        email: '',
        nickname: '',
        phone: '',
        post_no: '',
        post_addr: '',
        post_detail_list: ''
      },
      passwordConfirm: ''
    };
  },
  methods: {
    async fetchUserInfo() {
      const userId = sessionStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await axios.get(`/api/memEdit?user_id=${userId}`);
          this.user = response.data[0];
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    },
    async updateUser() {
      if (this.user.pw !== this.passwordConfirm) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      try {
        await axios.put(`/api/memEdit/${this.user.user_id}`, this.user);
        alert('회원 정보가 수정되었습니다.');
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating user info:', error);
        alert('회원 정보 수정에 실패했습니다.');
      }
    },
    goToDeletePage() {
      this.$router.push('/DeleteMem');
    },
    sample6_execDaumPostcode() {
      // Daum 우편번호 서비스 실행 함수
      // 필요한 경우 구현
    }
  },
  mounted() {
    this.fetchUserInfo();
  }
};
</script>

<style scoped>
.joinForm {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.textForm {
  margin-bottom: 10px;
}

.textForm input[type="text"],
.textForm input[type="password"],
.textForm input[type="number"] {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.textForm input[type="button"] {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  background-color: #f0f0f0;
}

.textForm input[type="button"]:hover {
  background-color: #e0e0e0;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.postcodeButton {
  margin-top: 5px;
}
</style>
