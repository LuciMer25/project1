<template>
  <div class="login-container">
    <div class="login-box">

      <div class="login-wrapper">
        <h2>회원가입</h2>
        <form method="post" action="서버의url" id="login-form">
          <label for="remember-check">
          </label>
  
          <input type="submit" value="회원가입">
        </form>
      </div>
      <hr>
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
export default {
  methods: {
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
  },
};
</script>


