<template>
  <div class="move-container-left">
    <div class="inner">
      <h3 class="title-t ty3">마이페이지</h3>
      <dl class="mypage-menu-list">
        <dt class="title-t ty7">쇼핑정보</dt>
        <dd><RouterLink to="orderlist" class="router-link">주문/배송조회</RouterLink></dd>
        <dd><RouterLink to="cancellist" class="router-link">취소/반품조회</RouterLink></dd>
        <dt class="title-t ty7">쇼핑활동</dt>
        <dd><RouterLink to="reviewlist" class="router-link">상품후기</RouterLink></dd>
        <dd><RouterLink to="wishlist" class="router-link">위시리스트</RouterLink></dd>
        <dt class="title-t ty7">회원정보</dt>
        <dd><RouterLink to="MemCheck" class="router-link">회원정보수정</RouterLink></dd>
        <dt class="title-t ty7">문의</dt>
        <dd><RouterLink to="qnalist" class="router-link">QnA</RouterLink></dd>
        <dd><RouterLink to="inquirylist" class="router-link">1:1문의</RouterLink></dd>
        <dt class="title-t ty7">공지</dt>
        <dd><RouterLink to="notify" class="router-link">공지사항</RouterLink></dd>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.move-container-left {
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  top: 20px;
  left: 20px;
  z-index: 1000;
  height: calc(100% - 40px);
}

.inner {
  margin-left: 10px;
}

.title-t {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title-t.ty3 {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 40px;
}

.title-t.ty7 {
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  color: #333; /* 타이틀 글자색 설정 */
}

.mypage-menu-list {
  list-style: none;
  padding: 0;
  height: 100%;
}

.mypage-menu-list dt {
  color: #333;
}

.mypage-menu-list dd {
  margin-bottom: 5px;
}

.router-link {
  text-decoration: none;
  color: #666; /* 라우터 링크 글자색 설정 */
  display: block;
  padding: 5px 0;
  transition: color 0.3s;
}

.router-link:hover {
  color: #000;
}
</style>
