<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-wrapper">
        <h2>회원가입</h2>
        <input type="button" value="아이디찾기" @click="showIdModal = true">
        <input type="button" value="비밀번호찾기" @click="showPasswordModal = true">

        <!-- 아이디 찾기 모달 -->
        <div class="modal-wrap" v-show="showIdModal">
          <div class="modal-container">
            <div class="login-wrapper">
              <p>아이디 찾기</p>
              <form @submit.prevent="findUserId">
                <input type="text" name="name" placeholder="이름" v-model="userFind.name">
                <hr>
                <input type="text" name="phone" placeholder="전화번호" v-model="userFind.phone">
                <div class="modal-btn">
                  <button type="button" @click="closeIdModal">닫기</button>
                  <button type="submit">확인</button>
                </div>
              </form>
              <!-- 조회된 결과 표시 -->
              <div v-if="userIdFound">
                <p>아이디: {{ userIdFound.user_id }}</p>
                <p>이름: {{ userIdFound.name }}</p>
                <p>전화번호: {{ userIdFound.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 비밀번호 찾기 모달 -->
        <div class="modal-wrap" v-show="showPasswordModal">
          <div class="modal-container">
            <div class="login-wrapper">
              <p>비밀번호 찾기</p>
              <form @submit.prevent="findUserPassword">
                <input type="text" name="name" placeholder="이름" v-model="userpwFind.name">
                <hr>
                <input type="text" name="id" placeholder="아이디" v-model="userpwFind.user_id">
                <hr>
                <input type="text" name="phone" placeholder="전화번호" v-model="userpwFind.phone">
                <div class="modal-btn">
                  <button type="button" @click="closePasswordModal">닫기</button>
                  <button type="submit">확인</button>
                </div>
              </form>
              <!-- 조회된 결과 표시 -->
              <div v-if="userPasswordFound">
                <input type="text" name="password" placeholder="변경할 비밀번호" v-model="userpwFind.pw">
                <button @click="changePassword">비밀번호 변경</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showIdModal: false,
      showPasswordModal: false,
      userFind: {
        name: '',
        phone: ''
      },
      userIdFound: null,

      userpwFind: {
        name: '',
        user_id: '',
        phone: '',
      },
      userPasswordFound: null,
      newPassword: ''
    };
  },
  methods: {
    closeIdModal() {
      this.showIdModal = false;
    },
    async findUserId() {
      try {
        const response = await axios.post('/api/userFind', {
          name: this.userFind.name,
          phone: this.userFind.phone
        });
        this.userIdFound = response.data;
      } catch (error) {
        console.error('사용자 조회 에러:', error);
      }
    },
    closePasswordModal() {
      this.showPasswordModal = false;
    },
    async findUserPassword() {
      try {
        const response = await axios.post('/api/userFind', {
          name: this.userpwFind.name,
          user_id: this.userpwFind.user_id,
          phone: this.userpwFind.phone
        });
        this.userPasswordFound = response.data;
      } catch (error) {
        console.error('비밀번호 조회 에러:', error);
      }
    },
    async changePassword() {
      try {
        const response = await axios.post('/api/userFind ', {
          user_id: this.userpwFind.user_id,
          name: this.userpwFind.name,
          phone: this.userpwFind.phone,
          pw: this.userpwFind.pw
        });
        // 비밀번호 변경 성공 시 처리
        console.log('비밀번호 변경 완료:', response.data, pw);
        this.userpwFind.pw = ''; // 입력 필드 초기화
      } catch (error) {
        console.error('비밀번호 변경 에러:', error);
      }
    }
  }
};
</script>

<style>
/* 스타일은 그대로 유지 */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.modal-container {
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
