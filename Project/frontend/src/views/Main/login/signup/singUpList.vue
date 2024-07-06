<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveUser">
    <h2>회원가입</h2>
    <div class="textForm">
      아이디
      <input name="user_id" type="text" class="singUp" placeholder="아이디" v-model="userInsert.user_id" minlength="5">
      <br> <button type="button" class="btn btn-outline-secondary" @click="checkUserId">아이디 중복체크</button>
    </div>
    <div class="textForm">
      비밀번호
      <input name="pw" type="password" class="singUp" placeholder="비밀번호" v-model="userInsert.pw" minlength="6">
    </div>
    <div class="textForm">
      비밀번호 확인
      <input type="password" class="singUp" placeholder="비밀번호 확인" v-model="passwordConfirm" minlength="6">
      <br> <button type="button" class="btn btn-outline-secondary" @click="checkPasswordMatch">비밀번호 확인</button>
    </div>
    <div class="textForm">
      이름<br>
      <input name="name" type="text" class="singUp" placeholder="이름" v-model="userInsert.name">
    </div>
    <div class="textForm">
      생년월일
       <br><input type="date" class="singUp" placeholder="생년월일" v-model="userInsert.birth">
    </div>
    <div class="textForm">
      전화번호
      <input name="phone" type="text" class="singUp" placeholder="전화번호" v-model="userInsert.phone" maxlength="13" @input="formatPhoneNumber">
      <br> <button type="button" class="btn btn-outline-secondary" @click="checkUserphone">전화번호중복체크</button>
    </div>
    <hr>
    <div class="textForm">
      <button type="button" @click="sample6_execDaumPostcode">우편번호찾기</button>
    </div>
    <div class="textForm">우편번호
      <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInsert.post_no">
    </div>
    <div class="textForm">주소<br>
      <input type="text" id="sample6_address" placeholder="주소" v-model="userInsert.post_addr"><br>
    </div>
    <div class="textForm">상세주소
      <input type="text" id="sample6_detailAddress" placeholder="상세주소" v-model="userInsert.post_detail_list">
    </div>
    <div class="textForm">참고항목
      <input type="text" id="sample6_extraAddress" placeholder="참고항목">
    </div>
    <input type="submit" class="btn btn-outline-secondary" :disabled="!isFormValid" value="가입하기"/>
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
        this.$swal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      
      try {
        const response = await axios.post("/api/signUp", this.userInsert);
        if (response.data.affectedRows == 1) {
          this.$swal("회원가입이 완료되었습니다.");
          this.$router.push("/login"); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          this.$swal("회원가입에 실패하였습니다.");
        }
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    },
    async checkUserId() {
      try {
        const response = await axios.post("/api/signUp/checkUserId", { user_id: this.userInsert.user_id });
        if (response.data.exists) {
          this.$swal("이미 사용 중인 아이디입니다.");
          this.userIdCheckPassed = false;
        } else {
          this.$swal("사용 가능한 아이디입니다.");
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
          this.$swal("이미 사용 중인 전화번호입니다.");
          this.phoneCheckPassed = false;
        } else {
          this.$swal("사용 가능한 전화번호입니다.");
          this.phoneCheckPassed = true;
        }
      } catch (error) {
        console.error("Error checking user phone:", error);
        this.phoneCheckPassed = false;
      }
    },
    checkPasswordMatch() {  // 추가: 비밀번호 일치 여부 확인
      if (this.userInsert.pw === this.passwordConfirm) {
        this.$swal('비밀번호 일치합니다');
        this.passwordCheckPassed = true;
      } else {
        this.$swal('비밀번호가 일치하지 않습니다.');
        this.passwordCheckPassed = false;
      }
    },
    sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          // 주소 값 설정
          this.userInsert.post_no = data.zonecode;
          this.userInsert.post_addr = data.roadAddress || data.jibunAddress || '';

          // 참고항목 설정
          let extraAddr = '';
          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }
          this.userInsert.post_detail_list = extraAddr;

          // Vue의 반응성을 이용해 화면 업데이트를 자동으로 처리
        }
      }).open();
    },
    formatPhoneNumber() {
      // 전화번호 자동 하이픈 추가 함수
      this.userInsert.phone = this.autoHypenPhone(this.userInsert.phone);
    },
    autoHypenPhone(str) {
      str = str.replace(/[^0-9]/g, '');
      var tmp = '';
      if (str.length < 4) {
        return str;
      } else if (str.length < 7) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
      } else if (str.length < 11) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
      } else {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7, 4);
        return tmp;
      }
      return str;
    }
  },
};
</script>

<style scoped>
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
  height: 1310px;
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 15px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

}

.joinForm h2 {
  text-align: center;
  margin: 20px 0 30px;
  font-size: 24px;
}

.textForm {
  margin-bottom: 20px;
  padding: 0 20px;
}

.textForm input {
  width: calc(100% - 40px);
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.textForm button {
  width: 30%;
  height: 40px;
  margin-left: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.textForm button:hover {
  background-color: #2980b9;
}

.btn {
  width: calc(100% - 40px);
  height: 40px;
  background: #3498db;
  border: none;
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  cursor: pointer;
}

.btn:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.postcodeButton {
  width: 100%;
  height: 40px;
  background: #2ecc71;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.postcodeButton:hover {
  background-color: #27ae60;
}
</style>