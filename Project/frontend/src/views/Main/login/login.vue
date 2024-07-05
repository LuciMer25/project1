<template>
  <div class="login-container">
    <div class="login-box">
      <hr>
      <div class="login-wrapper">
        <h2>Login</h2>
        <form @submit.prevent="loginUser" id="login-form">
          <input type="text" name="userName" placeholder="Email" v-model="userLogin.user_id">
          <input type="password" name="userPassword" placeholder="Password" v-model="userLogin.pw">
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userLogin: {
        user_id: '',
        pw: ''
      }
    };
  },
  methods: {
    ...mapActions(['loginUser', 'updateLoginInfo']),
    async loginUser() {
      try {
        const response = await axios.post('/api/login', this.userLogin);
        if (response.status === 200) {
          // 세션 및 sessionStorage에 사용자 정보 저장
          sessionStorage.setItem('user_id', response.data.user_id);
          sessionStorage.setItem('name', response.data.name);
          sessionStorage.setItem('user_resp', response.data.user_resp); // 사용자 역할 저장

          // 로그인 성공 알림
          this.$swal("로그인 성공!");

          let user = { user_id: response.data.user_id, name: response.data.name, user_resp: response.data.user_resp };
          this.$store.dispatch('updateLoginInfo', user);

          // 사용자 권한에 따라 페이지 이동
          if (response.data.user_resp === 'admin') {
            this.$router.push('/admin'); // 관리자 페이지 경로로 변경 필요
          } else {
            this.$router.push('/'); // 메인 페이지 경로로 변경 필요
          }

          // 사용자 정보 확인
          this.checkSessionStorage();
        } else {
          this.$swal("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        this.$swal("로그인 오류: 서버와의 통신에 문제가 발생했습니다.");
      }
    },
    checkSessionStorage() {
      // sessionStorage에 저장된 데이터 확인
      const userId = sessionStorage.getItem('user_id');
      const name = sessionStorage.getItem('name');
      const user_resp = sessionStorage.getItem('user_resp');

      console.log('사용자 ID:', userId);
      console.log('사용자 이름:', name);
      console.log('사용자 역할:', user_resp);
    },
    signUp() {
      this.$router.push('/signtUp1'); // signUp1 경로로 이동
    },
    FindIdPw() {
      this.$router.push('/FindIdPw'); // FindIdPw 경로로 이동
    },
    kakaoLogin() {
      const vm = this; // Vue 인스턴스 컨텍스트 저장
      window.Kakao.Auth.login({
        scope: "profile_image, account_email",
        success: vm.getKakaoAccount,
        fail: function(error) {
          console.log(error);
          this.$swal("카카오 로그인에 실패했습니다.");
        },
        
      });
    },
    getKakaoAccount(authObj) {
      const vm = this; // Vue 인스턴스 컨텍스트 저장
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(res) {
          const kakao_account = res.kakao_account;
          const user_id = res.id.toString(); // Kakao에서 제공하는 고유 user_id

          // user_id를 sessionStorage에 저장
          sessionStorage.setItem('user_id', user_id);
          
          // Vuex 스토어에 사용자 정보 저장
          vm.updateLoginInfo({ user_id: user_id });

          // user_id를 서버로 전송하여 존재 여부 확인
          vm.checkUserExistence(user_id);
        },
        fail: function(error) {
          console.error("Kakao API 요청 실패:", error);
        },
      });
    },
    checkUserExistence(user_id) {
      // 서버로 user_id를 전송하여 사용자 존재 여부 확인
      axios.get(`/api/kakaologin?user_id=${user_id}`)
        .then(response => {
          const data = response.data;
          if (data.exists) {
            // 사용자가 존재하는 경우 메인 화면으로 리다이렉트
            this.$router.push('/');
          } else {
            // 사용자가 존재하지 않는 경우 회원가입 페이지로 리다이렉트
            this.$router.push('/kakaosingUp');
          }
        })
        .catch(error => {
          console.error("서버 요청 오류:", error);
        });
    },
    signUp() {
      this.$router.push('/signtUp1'); // 회원가입 창으로 이동
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