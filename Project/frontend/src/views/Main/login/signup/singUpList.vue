<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveUser">
    <h2>회원가입</h2>
    <div class="textForm">
      <input name="user_id" type="text" class="id" placeholder="아이디" v-model="userInsert.user_id">
      <button type="button" @click="checkUserId">아이디 중복체크</button>
    </div>
    <div class="textForm">
      <input name="pw" type="password" class="pw" placeholder="비밀번호" v-model="userInsert.pw">
    </div>
    <div class="textForm">
      <input type="password" class="pw" placeholder="비밀번호 확인" v-model="passwordConfirm">
      <button type="button" @click="checkPasswordMatch">비밀번호 확인</button>
    </div>
    <div class="textForm">
      <input name="name" type="text" class="name" placeholder="이름" v-model="userInsert.name">
    </div>
    <div class="textForm">
      <input type="date"  class="birthdate" placeholder="생년월일" v-model="userInsert.birth">
    </div>
    <div class="textForm">
      <input name="phone" type="text" class="phone" placeholder="전화번호" v-model="userInsert.phone">
      <button type="button" @click="checkUserphone">전화번호 중복체크</button>
    </div>
    <div class="textForm">
      <button type="button" @click="sample6_execDaumPostcode">우편번호찾기</button>
    </div>
    <div class="textForm">
      <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInsert.post_no">
    </div>
    <div class="textForm">
      <input type="text" id="sample6_address" placeholder="주소" v-model="userInsert.post_addr"><br>
    </div>
    <div class="textForm">
      <input type="text" id="sample6_detailAddress" placeholder="상세주소" v-model="userInsert.post_detail_list">
    </div>
    <div class="textForm">
      <input type="text" id="sample6_extraAddress" placeholder="참고항목">
    </div>
    <input type="submit" class="btn" value="가입하기"/>
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
    };
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
        } else {
          alert("사용 가능한 아이디입니다.");
        }
      } catch (error) {
        console.error("Error checking user ID:", error);
      }
    },
    async checkUserphone() {
      try {
        const response = await axios.post("/api/signUp/checkUserphone", { phone: this.userInsert.phone });
        if (response.data.exists) {
          alert("이미 사용 중인 전화번호입니다.");
        } else {
          alert("사용 가능한 전화번호입니다.");
        }
      } catch (error) {
        console.error("Error checking user phone:", error);
      }
    },
    checkPasswordMatch() {  // 추가: 비밀번호 일치 여부 확인
      if (this.userInsert.pw === this.passwordConfirm) {
        alert('비밀번호 일치합니다');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
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
   width: 300px;
  height: 1000px;
  left:50%;
  right:50%;
  background-color: #FFFFFF;
  text-align: center;
 
  border-radius: 15px;
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

.btn:hover {
  background-position: right;
}
</style>

