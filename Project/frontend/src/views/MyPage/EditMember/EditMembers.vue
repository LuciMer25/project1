<template>
  <div class="col-md-9">
    <form action="doJoin" method="POST" class="joinForm" @submit.prevent="updateUser">
      <h2>회원수정</h2>
      <div class="textForm">
        아이디
        <input name="loginId" type="text" class="id" v-model="user.user_id" readonly>
      </div>
      <div class="textForm">비밀번호
        <input name="loginPw" type="password" class="pw" v-model="user.pw" placeholder="비밀번호">
      </div>
      <div class="textForm">비밀번호확인
        <input name="loginPwConfirm" type="password" class="pw" v-model="passwordConfirm" placeholder="비밀번호 확인">
      </div>
      <div class="textForm">이름<br>
        <input name="name" type="text" class="name" v-model="user.name" placeholder="이름">
      </div>
      <div class="textForm">전화번호
        <input name="cellPhone" id="cellPhone" type="text" class="cellphoneNo" v-model="user.phone" placeholder="전화번호" maxlength="13" @input="formatPhoneNumber">
        <br> <br><button type="button" @click="checkUserphone">전화번호 중복체크</button>
      </div>
      <div class="textForm">생년월일
        <input name="birth" type="tel" class="cellphoneNo" v-model="user.birth" placeholder="생년월일">
      </div>
      <div class="textForm">
        <br> <input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기" class="postcodeButton"><br>
        <div>우편번호
          <input type="text" id="sample6_postcode" v-model="user.post_no" placeholder="우편번호">
        </div>
        <div>주소<br>
          <input type="text" id="sample6_address" v-model="user.post_addr" placeholder="주소">
        </div>
        <div>상세주소
          <input type="text" id="sample6_detailAddress" v-model="user.post_detail_list" placeholder="상세주소">
        </div>
        <div>참고항목
          <input type="text" id="sample6_extraAddress" placeholder="참고항목">
        </div>
      </div>
      <input type="submit" class="btn btn-outline-secondary" value="수정하기"/>
      <button type="button" class="btn btn-danger" @click="goToDeletePage">회원탈퇴</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        user_id: "",
        name: "",
        phone: "",
        pw: "",
        post_addr: "",
        post_detail_list: "",
        post_no: "",
        birth: "",
      },
      passwordConfirm: '',
   
    };
  },
  methods: {
    async fetchUserInfo() {
      const userId = sessionStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await axios.get(`/api/memEdit?user_id=${userId}`);
          this.user = response.data[0];
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    },
    async updateUser() {
      // 입력 필드가 하나라도 비어 있는지 확인
      if (!this.user.user_id || !this.user.pw || !this.passwordConfirm || !this.user.name || !this.user.phone || !this.user.birth || !this.user.post_no || !this.user.post_addr) {
        this.$swal('모든 입력 필드를 채워주세요.');
        return; // 입력 필드가 비어 있으면 함수 종료
      }

      // 비밀번호 확인
      if (this.user.pw !== this.passwordConfirm) {
        this.$swal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return; // 비밀번호가 일치하지 않으면 함수 종료
      }

      // 전화번호 유효성 확인
    
      try {
        // 사용자 정보 업데이트 요청
        await axios.put(`/api/memEdit/${this.user.user_id}`, this.user);
        this.$swal('회원 정보가 수정되었습니다.');
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating user info:', error);
        this.$swal('회원 정보 수정에 실패했습니다.');
      }
    },
    async checkUserphone() {
      try {
        const response = await axios.post("/api/signUp/checkUserphone", { phone: this.user.phone });
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
    goToDeletePage() {
      this.$router.push('/DeleteMem');
    },
    sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          // 우편번호 설정
          this.user.post_no = data.zonecode; // 수정: this.user를 사용하여 객체에 접근

          // 주소 설정
          this.user.post_addr = data.roadAddress || data.jibunAddress || '';

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
          this.user.post_detail_list = extraAddr;

          // Vue의 반응성을 이용해 화면을 자동으로 업데이트
        }
      }).open();
    },
    formatPhoneNumber() {
      // 전화번호 자동 하이픈 추가 함수
      this.user.phone = this.autoHypenPhone(this.user.phone);
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
  mounted() {
    this.fetchUserInfo();
  }
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
