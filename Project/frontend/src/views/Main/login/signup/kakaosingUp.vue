<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveUser">
    <h2>회원가입</h2>
    <div class="textForm">아이디
      <input name="user_id" type="text" class="id" placeholder="아이디" v-model="userInsert.user_id" readonly>
    </div>
    <div class="textForm">비밀번호
      <input name="pw" type="password" class="pw" placeholder="비밀번호" v-model="userInsert.pw" minlength="6">
    </div>
    <div class="textForm">비밀번호 확인
      <input type="password" class="pw" placeholder="비밀번호 확인" v-model="passwordConfirm" minlength="6">
      <br><button type="button" @click="checkPasswordMatch">비밀번호 확인</button>
    </div>
    <div class="textForm">이름<br>
      <input name="name" type="text" class="name" placeholder="이름" v-model="userInsert.name" >
    </div>
    <div class="textForm">생년월일
      <input type="date" class="birthdate" placeholder="생년월일" v-model="userInsert.birth">
    </div>
    <div class="textForm">전화번호
      <input name="phone" type="text" class="phone" placeholder="전화번호" v-model="userInsert.phone" maxlength="13" @input="formatPhone">
     <br> <button type="button" @click="checkUserphone">전화번호 중복체크</button>
    </div>
    <br>
    <div class="textForm">
      <button type="button" @click="sample6_execDaumPostcode">우편번호찾기</button>
    </div>
    <div class="textForm">우편번호
      <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInsert.post_no">
    </div>
    <div class="textForm">주소<br>
      <input type="text" id="sample6_address" placeholder="주소" v-model="userInsert.post_addr">
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
        user_id: "", // 여기에 카카오 이메일 값을 넣을 예정
        name: "",
        phone: "",
        pw: "",
        post_addr: "",
        post_detail_list: "",
        post_no: "",
        birth: "",
      },
      passwordConfirm: "", // 비밀번호 확인을 위한 변수 추가
      isPasswordMatch: false, // 비밀번호 일치 여부
      isPhoneValid: false, // 전화번호 유효성 여부
    };
  },
  computed: {
    isFormValid() {
      return (
        this.isPasswordMatch &&
        this.isPhoneValid &&
        this.userInsert.user_id &&
        this.userInsert.pw &&
        this.passwordConfirm &&
        this.userInsert.name &&
        this.userInsert.birth &&
        this.userInsert.phone &&
        this.userInsert.post_no &&
        this.userInsert.post_addr &&
        this.userInsert.post_detail_list
      );
    },
  },
  methods: {
    async saveUser() {
      try {
        // 서버로 데이터 전송
        const response = await axios.post("/api/signup", this.userInsert);
        if (response.data.affectedRows == 1) {
          this.$swal("회원가입이 완료되었습니다.");
          sessionStorage.removeItem('email'); // sessionStorage에서 이메일 삭제
          this.$router.push("/"); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          this.$swal("회원가입에 실패하였습니다.");
        }
      } catch (error) {
        console.error("사용자 정보 저장 중 오류:", error);
      }
    },
    checkPasswordMatch() {
      this.isPasswordMatch = this.userInsert.pw === this.passwordConfirm;
      if (this.isPasswordMatch) {
        this.$swal('비밀번호가 일치합니다.');
      } else {
        this.$swal('비밀번호가 일치하지 않습니다.');
      }
    },
    async checkUserphone() {
      try {
        const response = await axios.post("/api/signUp/checkUserphone", { phone: this.userInsert.phone });
        if (response.data.exists) {
          this.isPhoneValid = false;
          this.$swal("이미 사용 중인 전화번호입니다.");
        } else {
          this.isPhoneValid = true;
          this.$swal("사용 가능한 전화번호입니다.");
        }
      } catch (error) {
        console.error("전화번호 중복 체크 중 오류:", error);
      }
    },
    formatPhone(event) {
      let input = event.target.value.replace(/\D/g, '');
      let formatted = '';

      if (input.length < 4) {
        formatted = input;
      } else if (input.length < 7) {
        formatted = input.substr(0, 3) + '-' + input.substr(3);
      } else if (input.length < 11) {
        formatted = input.substr(0, 3) + '-' + input.substr(3, 3) + '-' + input.substr(6);
      } else {
        formatted = input.substr(0, 3) + '-' + input.substr(3, 4) + '-' + input.substr(7);
      }

      this.userInsert.phone = formatted;
    },
    sample6_execDaumPostcode() {
      let vm = this;
      new daum.Postcode({
        oncomplete: function(data) {
          let addr = ''; // 주소 변수
          let extraAddr = ''; // 참고항목 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }

          // Vue 데이터에 주소 및 우편번호 저장
          vm.userInsert.post_addr = addr;
          vm.userInsert.post_no = data.zonecode;
          vm.userInsert.post_detail_list = ''; // 상세주소 초기화

          // 참고항목은 무조건 초기화
          document.getElementById("sample6_extraAddress").value = '';

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
        }
      }).open();
    },
  },
  mounted() {
    // sessionStorage에서 카카오에서 받아온 이메일을 user_id 필드에 넣기
    const kakaoEmail = sessionStorage.getItem("user_id");
    if (kakaoEmail) {
      this.userInsert.user_id = kakaoEmail;
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
  height: 1250px;
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
  font-size: 16px;
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