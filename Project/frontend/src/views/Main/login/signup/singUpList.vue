<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveUser">
    <h2>회원가입</h2>
    <div class="textForm">
      아이디
      <input name="user_id" type="text" class="id" placeholder="아이디" v-model="userInsert.user_id">
      <button type="button" class="btn btn-outline-secondary" @click="checkUserId">아이디 중복체크</button>
    </div>
    <div class="textForm">
      비밀번호
      <input name="pw" type="password" class="pw" placeholder="비밀번호" v-model="userInsert.pw">
    </div>
    <div class="textForm">
      비밀번호 확인
      <input type="password" class="pw" placeholder="비밀번호 확인" v-model="passwordConfirm">
      <button type="button" class="btn btn-outline-secondary" @click="checkPasswordMatch">비밀번호 확인</button>
    </div>
    <div class="textForm">
      이름
      <input name="name" type="text" class="name" placeholder="이름" v-model="userInsert.name">
    </div>
    <div class="textForm">
      생년월일
      <input type="date" class="birthdate" placeholder="생년월일" v-model="userInsert.birth">
    </div>
    <div class="textForm">
      전화번호
      <input name="phone" type="text" class="phone" placeholder="전화번호" v-model="userInsert.phone">
      <button type="button" class="btn btn-outline-secondary" @click="checkUserphone">전화번호 중복체크</button>
    </div>
    <div class="textForm">
      <button type="button" @click="sample6_execDaumPostcode">우편번호찾기</button>
    </div>
    <div class="textForm">우편번호
      <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInsert.post_no">
    </div>
    <div class="textForm">주소
      <input type="text" id="sample6_address" placeholder="주소" v-model="userInsert.post_addr"><br>
    </div>
    <div class="textForm">상세주소
      <input type="text" id="sample6_detailAddress" placeholder="상세주소" v-model="userInsert.post_detail_list">
    </div>
    <div class="textForm">참고항목
      <input type="text" id="sample6_extraAddress" placeholder="참고항목">
    </div>
    <input type="submit" class="btn" :disabled="!isFormValid" value="가입하기"/>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInsert: {
        user_id: "",
        name: "",
        phone: "",
        pw: "",
        post_addr: "",
        post_detail_list: "",
        post_no: "",
        birth: "",
      },
      passwordConfirm: "",  // 추가: 비밀번호 확인 입력값을 저장
      phoneCheckPassed: false,  // 추가: 전화번호 중복체크 통과 여부
      passwordCheckPassed: false,  // 추가: 비밀번호 확인 통과 여부
      userIdCheckPassed: false,  // 추가: 아이디 중복체크 통과 여부
    };
  },
  computed: {
    isFormValid() {
      return this.phoneCheckPassed && this.passwordCheckPassed && this.userIdCheckPassed;
    },
  },
  methods: {
    async saveUser() {
      if (this.userInsert.pw !== this.passwordConfirm) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      
      try {
        const response = await axios.post("/api/signUp", this.userInsert);
        if (response.data.affectedRows == 1) {
          alert("회원가입이 완료되었습니다.");
          this.$router.push("/login"); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    },
    async checkUserId() {
      try {
        const response = await axios.post("/api/signUp/checkUserId", { user_id: this.userInsert.user_id });
        if (response.data.exists) {
          alert("이미 사용 중인 아이디입니다.");
          this.userIdCheckPassed = false;
        } else {
          alert("사용 가능한 아이디입니다.");
          this.userIdCheckPassed = true;
        }
      } catch (error) {
        console.error("Error checking user ID:", error);
        this.userIdCheckPassed = false;
      }
    },
    async checkUserphone() {
      try {
        const response = await axios.post("/api/signUp/checkUserphone", { phone: this.userInsert.phone });
        if (response.data.exists) {
          alert("이미 사용 중인 전화번호입니다.");
          this.phoneCheckPassed = false;
        } else {
          alert("사용 가능한 전화번호입니다.");
          this.phoneCheckPassed = true;
        }
      } catch (error) {
        console.error("Error checking user phone:", error);
        this.phoneCheckPassed = false;
      }
    },
    checkPasswordMatch() {  // 추가: 비밀번호 일치 여부 확인
      if (this.userInsert.pw === this.passwordConfirm) {
        alert('비밀번호 일치합니다');
        this.passwordCheckPassed = true;
      } else {
        alert('비밀번호가 일치하지 않습니다.');
        this.passwordCheckPassed = false;
      }
    },
    sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: function(data) {
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          if(data.userSelectedType === 'R'){
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
              extraAddr += data.bname;
            }
            if(data.buildingName !== '' && data.apartment === 'Y'){
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            if(extraAddr !== ''){
              extraAddr = ' (' + extraAddr + ')';
            }
            document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
            document.getElementById("sample6_extraAddress").value = '';
          }

          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          document.getElementById("sample6_detailAddress").focus();
        }
      }).open();
    },
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family: sans-serif;
}

body {
  background-color: #34495e;
}

.joinForm {
  position: relative;
  width: 500px;
  height: 1500px;
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 15px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 20px;
}

.joinForm h2 {
  text-align: center;
  margin: 30px 0;
}

.textForm {
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 2px solid #adadad;
}

.textForm input {
  width: 100%;
  border: none;
  outline: none;
  color: #636e72;
  font-size: 16px;
  height: 25px;
  background: none;
}

.btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  width: 80%;
  height: 40px;
  background: linear-gradient(125deg, #81ecec, #6c5ce7, #81ecec);
  background-size: 200%;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.4s;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn:hover:enabled {
  background-position: right;
}
</style>
