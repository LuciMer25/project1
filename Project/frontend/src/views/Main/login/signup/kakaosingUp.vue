<template>
  <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveUser">
    <h2>회원가입</h2>
    <div class="textForm">아이디
      <input name="user_id" type="text" class="id" placeholder="아이디" v-model="userInsert.user_id">
    </div>
    <div class="textForm">비밀번호
      <input name="pw" type="password" class="pw" placeholder="비밀번호" v-model="userInsert.pw">
    </div>
    <div class="textForm">비밀번호 확인
      <input type="password" class="pw" placeholder="비밀번호 확인" v-model="passwordConfirm">
      <button type="button" @click="checkPasswordMatch">비밀번호 확인</button>
    </div>
    <div class="textForm">이름
      <input name="name" type="text" class="name" placeholder="이름" v-model="userInsert.name">
    </div>
    <div class="textForm">생년월일
      <input type="date" class="birthdate" placeholder="생년월일" v-model="userInsert.birth">
    </div>
    <div>
    <input name="phone" type="text" class="phone" placeholder="전화번호" v-model="userInsert.phone">전화번호
    <button type="button" @click="checkUserphone">전화번호 중복체크</button>
    </div>
    <div class="textForm">
      <button type="button" @click="sample6_execDaumPostcode">우편번호찾기</button>
    </div>
    <div class="textForm">우편번호
      <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInsert.post_no">
    </div>
    <div class="textForm">주소
      <input type="text" id="sample6_address" placeholder="주소" v-model="userInsert.post_addr">
    </div>
    <div class="textForm">상세주소
      <input type="text" id="sample6_detailAddress" placeholder="상세주소" v-model="userInsert.post_detail_list">
    </div>
    <div class="textForm">참고항목
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
    };
  },
  methods: {
    async saveUser() {
      try {
        // 서버로 데이터 전송
        const response = await axios.post("/api/signup", this.userInsert);
        if (response.data.affectedRows == 1) {
          alert("회원가입이 완료되었습니다.");
          sessionStorage.removeItem('email'); // sessionStorage에서 이메일 삭제
          this.$router.push("/login"); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      } catch (error) {
        console.error("사용자 정보 저장 중 오류:", error);
      }
    },
    checkPasswordMatch() {  // 추가: 비밀번호 일치 여부 확인
      if (this.userInsert.pw === this.passwordConfirm) {
        alert('비밀번호 일치합니다');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
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
        console.error("전화번호 중복 체크 중 오류:", error);
      }
    },
    sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

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
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById("sample6_extraAddress").value = extraAddr;

          } else {
            document.getElementById("sample6_extraAddress").value = '';
          }

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
  height: 1000px;
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 15px;
  margin: 0 auto; /* 수평 가운데 정렬 */
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
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.btn:hover {
  background: #27ae60;
}
</style>
