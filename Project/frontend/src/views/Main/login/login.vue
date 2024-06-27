<template>
  <div class="login-container">
    <div class="login-box">
      <hr>
      <div class="login-wrapper">
        <h2>Login</h2>
        <form @submit.prevent="loginUser" id="login-form">
          <input type="text" name="userName" placeholder="Email" v-model="userLogin.user_id">
          <input type="password" name="userPassword" placeholder="Password" v-model="userLogin.userPassword">
          <!-- userLogin.pw → userLogin.userPassword으로 수정 -->
          <label for="remember-check">
            <input type="checkbox" id="remember-check">아이디 저장하기
          </label>
          <input type="submit" value="Login">
          <input type="button" value="회원가입" @click="signUp">
        </form>
      </div>
      <div style="text-align: center;">
        <a id="custom-login-btn" @click="kakaoLogin()">
          <img
            src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인 버튼"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// axios를 Vue 컴포넌트에 임포트합니다.
import axios from 'axios';

export default {
  data() {
    return {
      userLogin: {
        user_id: '',
        userPassword: '' // userLogin 객체의 pw → userPassword로 수정
      }
    };
  },
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      const vm = this; // Vue 인스턴스 컨텍스트 저장
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(res) {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname;
          const email = kakao_account.email;
          console.log("nickname", nickname);
          console.log("email", email);

          // sessionStorage에 데이터 저장 예시
          sessionStorage.setItem('nickname', nickname);
          sessionStorage.setItem('email', email);

          alert("로그인 성공!");

          // Vue Router를 사용하여 BoardList.vue로 리다이렉트
          vm.$router.push('/'); // '/boardlist'가 경로로 가정
        },
        fail: function(error) {
          console.log(error);
        },
      });
    },
    signUp() {
      this.$router.push('/signtUp1'); // signUp1 경로로 이동
    },
    async loginUser() {
      try {
        const response = await axios.post('/api/login', this.userLogin);
        if (response.status === 200) { // affectedRows 대신 status 검사
          // sessionStorage에 데이터 저장 예시
          sessionStorage.setItem('user_id', response.data.user_id);
          sessionStorage.setItem('name', response.data.name);
          
          alert("로그인 성공!");

          // Vue Router를 사용하여 BoardList.vue로 리다이렉트
          this.$router.push('/'); // '/list'가 board list 경로로 가정
        } else {
          alert("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 오류: 서버와의 통신에 문제가 발생했습니다.");
      }
    },
  },
};
</script>



<style>
* {
  padding: 0;
  margin: 0;
  border: none;
}

body {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.login-wrapper {
  margin-bottom: 20px;
}

.login-wrapper > h2 {
  font-size: 24px;
  color: #6A24FE;
  margin-bottom: 20px;
}

#login-form > input {
  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #F8F8F8;
}

#login-form > input::placeholder {
  color: #D2D2D2;
}

#login-form > input[type="submit"] {
  color: #fff;
  font-size: 16px;
  background-color: #6A24FE;
  margin-top: 20px;
}
</style>