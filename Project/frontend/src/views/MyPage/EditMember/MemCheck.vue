<template>
  <div class="col-md-9">
    <div class="login-box">
      <h4>회원정보를 보호를 위해
           <br>회원정보를 입력해주세요.</h4>
      <hr>
      <div class="login-wrapper">
        <p>비밀번호</p>
        <form @submit.prevent="handleSubmit" id="login-form">
          <input type="password" v-model="userLogin.pw" placeholder="Password" required>
          <input type="submit" value="확인">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// axios import 추가
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
      userLogin: {
        pw: ''
      }
    };
  },
  mounted() {
    // Vue 컴포넌트가 마운트될 때 sessionStorage에서 user_id 값을 가져옴
    this.userId = sessionStorage.getItem('user_id');
    console.log(this.userId);
  },
  methods: {
    async handleSubmit() {
      // 실제 서버의 URL을 정의
      const serverUrl = '/api/memcheck';

      try {
        // axios를 이용하여 서버에 POST 요청을 보냄
        const response = await axios.post(serverUrl, {
          user_id: this.userId,
          pw: this.userLogin.pw
        });

        // 서버에서 올바른 응답을 받은 경우
        if (response.status === 200) {
          // 비밀번호가 맞으면 다음 페이지로 이동
          window.location.href = '/EditMembers';
        } else {
          // 비밀번호가 틀린 경우
          alert('비밀번호가 올바르지 않습니다.');
        }
      } catch (error) {
        // 서버와의 통신에서 오류가 발생한 경우
        console.error('Error:', error);
        alert('서버 응답을 처리하는 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
/* 추가적인 스타일링 */
</style>
