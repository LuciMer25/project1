<template>
  <div class="login-container">
    <div class="login-box">

      <div class="login-wrapper">
        <h2>회원가입</h2>
        <form method="post" action="서버의url" id="login-form">
          <label for="remember-check">
          </label>
          <input type="button" value="회원가입" @click="signUp">
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
        fail: function(error) {
          console.log(error);
          alert("카카오 로그인에 실패했습니다.");
        },
      });
    },
    getKakaoAccount() {
      const vm = this; // Vue 인스턴스 컨텍스트 저장
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(res) {
          const kakao_account = res.kakao_account;
          const user_id = res.id.toString(); // Kakao에서 제공하는 고유 user_id

          // user_id를 sessionStorage에 저장
          sessionStorage.setItem('user_id', user_id);

          // user_id를 서버로 전송하여 존재 여부 확인
          vm.checkUserExistence(user_id);
        },
        fail: function(error) {
          console.log(error);
        },
      });
    },
    checkUserExistence(user_id) {
      // 서버로 user_id를 전송하여 사용자 존재 여부 확인
      fetch(`/api/kakaologin?user_id=${user_id}`)
        .then(response => response.json())
        .then(data => {
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
      this.$router.push('/singUpList'); // 회원가입 창으로 이동
    },
  },
};
</script>
