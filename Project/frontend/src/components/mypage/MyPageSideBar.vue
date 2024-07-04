<template>
    <div class="move-container-left">
    <div class="inner">
        <h3 class="title-t ty3">마이페이지</h3>
                <dl class="mypage-menu-list">
                    <dt class="title-t ty7">쇼핑정보</dt>
                    <dd><RouterLink to = "orderlist">주문/배송조회</RouterLink></dd>
                    <dd><RouterLink to = "cancellist">취소/반품조회</RouterLink></dd>
                    <dt class="title-t ty7">쇼핑활동</dt>
                    <dd><RouterLink to = "reviewlist">상품후기</RouterLink></dd>
                    <dd><RouterLink to = "wishlist">위시리스트(미완성)</RouterLink></dd>
                    <dt class="title-t ty7">회원정보</dt>
                    <dd><RouterLink to = "MemCheck">회원정보수정</RouterLink></dd>
                    <dt class="title-t ty7">문의</dt>
                    <dd><RouterLink to = "qnalist">QnA</RouterLink></dd>
                    <dd><RouterLink to = "inquirylist">1:1문의</RouterLink></dd>
                    <dt class="title-t ty7">공지</dt>
                    <dd><RouterLink to = "notify">공지사항</RouterLink></dd>
                </dl>
    </div>
</div>
</template>
<style scoped>
.move-container-left {
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  top: 20px; /* 상단 여백 설정 */
  left: 20px; /* 왼쪽 여백 설정 */
  z-index: 1000; /* 다른 요소 위에 레이어를 설정합니다. */
  overflow-y: auto; /* 사이드 바가 넘치는 경우 스크롤이 표시됩니다. */
  height: calc(100% - 40px); /* 높이를 브라우저 높이보다 40px 작게 만듭니다. */
}

.inner {
  margin-left: 10px;
}

.title-t {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

.title-t.ty7 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
}

.mypage-menu-list {
  list-style: none;
  padding: 0;
}

.mypage-menu-list dt {
  color: #333;
}

.mypage-menu-list dd {
  margin-bottom: 5px;
}

.mypage-menu-list a {
  text-decoration: none;
  color: #666;
  display: block;
  padding: 5px 0;
  transition: color 0.3s;
}

.mypage-menu-list a:hover {
  color: #000;
}
</style>