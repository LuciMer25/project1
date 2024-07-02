const express = require("express");
const router = express.Router();
const query = require("../../mysql");

// 사용자 로그인
router.post("/", async (req, res) => {
  const userid = req.body.user_id;
  const userpw = req.body.pw; // Vue 컴포넌트에서 v-model이 userLogin.pw으로 설정되어 있으므로 수정

  console.log(userid+"ㅂㅈㄷㅂㅈㄷ");
  console.log(userpw+"ㄴㅇㄹㄴㅇ");
  try {
    let result = await query("userLogin", [userid, userpw]);
    // res.send(result);
    console.log(result);
    let user = result.find(m => m.user_id === userid && m.pw === userpw); // 사용자 찾기
    console.log('user:', user);
    if (user) {
      req.session.user_id = userid; // 세션에 사용자 이메일 정보 저장
      req.session.is_logined = true; // 세션에 로그인 여부 저장
      req.session.save(err => { // 세션 저장
        if (err) throw err;
        res.json(user); // 사용자 정보 반환
      });
    } else {
      res.sendStatus(401); // 인증 실패
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    res.sendStatus(500); // 서버 오류

  }
});

module.exports = router;
