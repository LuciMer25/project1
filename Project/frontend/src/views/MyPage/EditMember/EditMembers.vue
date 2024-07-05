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
      <input name="cellphoneNo" type="number" class="cellphoneNo" v-model="user.phone" placeholder="전화번호" readonly>
    </div>
    <div class="textForm">생년월일
      <input name="cellphoneNo" type="tel" class="cellphoneNo" v-model="user.birth" placeholder="생년월일" readonly>
    </div>
    <div class="textForm">
      <input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기" class="postcodeButton"><br>
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
    <input type="submit" class="btn" value="수정하기"/>
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
      passwordConfirm: ''
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
      if (this.user.pw !== this.passwordConfirm) {
        this.$swal('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return; // 일치하지 않을 때 함수를 여기서 종료하여 아래 코드 실행을 막습니다.
      }

      try {
        await axios.put(`/api/memEdit/${this.user.user_id}`, this.user);
        this.$swal('회원 정보가 수정되었습니다.');
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating user info:', error);
        this.$swal('회원 정보 수정에 실패했습니다.');
      }
    },
    goToDeletePage() {
      this.$router.push('/DeleteMem');
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
  height: 1300px;
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


