<template>
  <div class="login-container">
    <div class="login-box">
      <hr>
      <div class="login-wrapper">
        <h2>Login</h2>
        <form @submit.prevent="loginUser" id="login-form">
          <input type="text" name="userName" placeholder="Email" v-model="userLogin.user_id">
          <input type="password" name="userPassword" placeholder="Password" v-model="userLogin.userPassword">
          <label for="remember-check">
            <input type="checkbox" id="remember-check">아이디 저장하기
          </label>
          <input type ="button" value="아이디 비밀번호 찾기" @click="FindIdPw"> 
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
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      userLogin: {
        user_id: '',
        userPassword: ''
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/login', this.userLogin);
        if (response.status === 200) {
          // 세션 및 sessionStorage에 사용자 정보 저장
          sessionStorage.setItem('user_id', response.data.user_id);
          sessionStorage.setItem('name', response.data.name);

          // 로그인 성공 알림
          alert("로그인 성공!");

          let user = { user_id : response.data.user_id, name : response.data.name };
          this.$store.dispatch('updateLoginInfo', user);

          // Vue Router를 사용하여 메인 페이지로 이동
          this.$router.push('/'); // 메인 페이지 경로로 변경 필요

          // 사용자 정보 확인
          this.checkSessionStorage();
        } else {
          alert("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 오류: 서버와의 통신에 문제가 발생했습니다.");
      }
    },
    checkSessionStorage() {
      // sessionStorage에 저장된 데이터 확인
      const userId = sessionStorage.getItem('user_id');
      const name = sessionStorage.getItem('name');

      console.log('사용자 ID:', userId);
      console.log('사용자 이름:', name);
    },
    // 나머지 메서드는 이하 생략
    signUp() {
      this.$router.push('/signtUp1'); // signUp1 경로로 이동
    },
    FindIdPw() {
      this.$router.push('/FindIdPw'); // signUp1 경로로 이동
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      const vm = this; // Store the Vue instance context
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(res) {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname;
          const email = kakao_account.email;
          console.log("nickname", nickname);
          console.log("email", email);

          // Example of storing data in sessionStorage
          sessionStorage.setItem('nickname', nickname);
          sessionStorage.setItem('email', email);

          alert("로그인 성공!");

          // Redirect to BoardList.vue using Vue Router
          vm.$router.push('/list'); // Assuming '/boardlist' is your route path
        },
        fail: function(error) {
          console.log(error);
        },
      });
    },
    kakaoLogout() {
      const vm = this; // Store the Vue instance context
      window.Kakao.Auth.logout(function() {
        // Clear sessionStorage
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('email');
        
        // Optional: Clear any other state or UI related to logged-in state
        // For example, resetting the UI or redirecting to a login page
        
        // Redirect to '/' after logout (adjust as needed)
        vm.$router.push('/');
      });
    },
  }
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