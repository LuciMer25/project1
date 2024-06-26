<template>
    <form action="doJoin" method="POST" class="joinForm" onsubmit="DoJoinForm__submit(this); return false;">
      <h2>회원수정</h2>
      <div class="textForm">
        아이디<input name="loginId" type="text" class="id" placeholder="아이디">
      </div>
      <div class="textForm">
        비밀번호 <input name="loginPw" type="password" class="pw" placeholder="비밀번호">
      </div>
      <div class="textForm">
        비밀번호 확인<input name="loginPwConfirm" type="password" class="pw" placeholder="비밀번호 확인">
      </div>
      <div class="textForm">
        이름<input name="name" type="text" class="name" placeholder="이름">
      </div>
      <div class="textForm">
        이메일 <input name="email" type="text" class="email" placeholder="이메일">
      </div>
      <div class="textForm">
        닉네임 <input name="nickname" type="text" class="nickname" placeholder="닉네임">
      </div>
      <div class="textForm">
        전화번호<input name="cellphoneNo" type="number" class="cellphoneNo" placeholder="전화번호">
      </div>
      <div class="textForm">
        <input type="text" id="sample6_postcode" placeholder="우편번호">
        <input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
        <input type="text" id="sample6_address" placeholder="주소"><br>
        <input type="text" id="sample6_detailAddress" placeholder="상세주소">
        <input type="text" id="sample6_extraAddress" placeholder="참고항목">
      </div>
      <input type="submit" class="btn" value="가입하기"/>
    </form>
  </template>
  

  
  <script>
    function sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: function(data) {
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수
  
          // 사용자가 도로명 주소를 선택했을 경우
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
            
            // 법정동명이 있을 경우 추가
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            
            // 공동주택일 경우 추가
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            
            // 참고항목이 있을 경우 괄호로 묶어서 추가
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
            
            // 참고항목 입력란에 값을 넣는다
            document.getElementById("sample6_extraAddress").value = extraAddr;
          } else {
            document.getElementById("sample6_extraAddress").value = '';
          }
  
          // 우편번호, 주소 입력란에 값을 넣는다
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          
          // 상세주소 입력란에 포커스를 맞춘다
          document.getElementById("sample6_detailAddress").focus();
        }
      }).open();
    }
  </script>
  