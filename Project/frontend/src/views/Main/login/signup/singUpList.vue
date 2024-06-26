<template>
    <form action="doJoin" method="POST" class="joinForm" @submit.prevent="saveBoard">
      <h2>회원가입</h2>
      <div class="textForm">
        <input name="loginId" type="text" class="id" placeholder="아이디" v-model="userInfo.user_id">
      </div>
      <div class="textForm">
        <input name="loginPw" type="password" class="pw" placeholder="비밀번호" v-model="userInfo.pw">
      </div>
      <div class="textForm">
        <input name="loginPwConfirm" type="password" class="pw" placeholder="비밀번호 확인" v-model="userInfo.loginPwConfirm">
      </div>
      <div class="textForm">
        <input name="name" type="text" class="name" placeholder="이름" v-model="userInfo.name">
      </div>
      <div class="textForm">
        <input name="email" type="text" class="email" placeholder="이메일" v-model="userInfo.email">
      </div>
      <div class="textForm">
        <input name="nickname" type="text" class="nickname" placeholder="생년월일" v-model="userInfo.birth">
      </div>
      <div class="textForm">
        <input name="cellphoneNo" type="number" class="cellphoneNo" placeholder="전화번호" v-model="userInfo.phone">
      </div>
      <div class="textForm">
        <button type="button" @click="sample6_execDaumPostcode" value="우편번호 찾기">우편번호찾기</button>
      </div>
      <div class="textForm">
        <input type="text" id="sample6_postcode" placeholder="우편번호" v-model="userInfo.post_no">
      </div>
      <div class="textForm">
        <input type="text" id="sample6_address" placeholder="주소" v-model="userInfo.post_addr"><br>
      </div>
      <div class="textForm">
        <input type="text" id="sample6_detailAddress" placeholder="상세주소" v-model="userInfo.post_detail_list">
      </div>
      <input type="submit" class="btn" value="가입하기"/>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        searchNo: "",
        userInfo: {
          user_id: "",
          name: "",
          phone: "",
          pw: "",
          post_addr: "",
          post_detail_list: "",
          post_no: "",
          birth: "",
          email: "",
          loginPwConfirm: "",
        },
      };
    },
    created() {
      this.searchNo = this.$route.query.no || "";
      if (this.searchNo) {
        this.getuserInfo();
      }
    },
    methods: {
      async getuserInfo() {
        try {
          const response = await axios.get(`/api/user/${this.searchNo}`);
          this.userInfo = response.data;
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      },
      async saveBoard() {
        try {
          const response = await axios.post("/api/user", this.userInfo);
          if (response.data.success) {
            alert("회원가입이 완료되었습니다.");
            this.$router.push("/login");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        } catch (error) {
          console.error("Error saving user info:", error);
        }
      },
      sample6_execDaumPostcode() {
        new daum.Postcode({
          oncomplete: (data) => {
            var addr = ''; // 주소 변수
  
            // 사용자가 도로명 주소를 선택했을 경우
            if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
            }
  
            // 우편번호, 주소 입력란에 값을 넣는다
            this.userInfo.post_no = data.zonecode;
            this.userInfo.post_addr = addr;
  
            // 상세주소 입력란에 포커스를 맞춘다
            this.$nextTick(() => this.$refs.detailAddress.focus());
          }
        }).open();
      },
    },
  };
  </script>
  
  