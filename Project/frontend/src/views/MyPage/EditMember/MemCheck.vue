
<template>
  <div class="center-container">
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
    this.userId = sessionStorage.getItem('user_id');
    console.log(this.userId);
  },
  methods: {
    async handleSubmit() {
      const serverUrl = '/api/memcheck';

      try {
        const response = await axios.post(serverUrl, {
          user_id: this.userId,
          pw: this.userLogin.pw
        });

        if (response.status === 200) {
          window.location.href = '/EditMembers';
        } else {
          this.$swal('비밀번호가 올바르지 않습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        this.$swal('서버 응답을 처리하는 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
.center-container{
  margin: 0 auto;
  width: 50px;
  margin-top: 150px;
  margin-left: 350px;
}


.login-box {
  background-color: white;
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 auto;

}

.login-wrapper p {
  margin: 0;
  padding: 10px 0;
}

#login-form input[type="password"],
#login-form input[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#login-form input[type="submit"] {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

#login-form input[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
