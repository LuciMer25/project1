const express = require("express");
const router = express.Router();
const query = require("../../mysql");

// 사용자 로그인
router.post("/", async (req, res) => {
  const userid = req.body.user_id;
  const userpw = req.body.pw;

  console.log("UserID:", userid);
  console.log("UserPW:", userpw);

  try {
    let result = await query("usercheck", [userid, userpw]);

    if (result.length > 0) {
      req.session.user_id = userid; // 세션에 사용자 ID 정보 저장
      req.session.is_logined = true; // 세션에 로그인 여부 저장
      req.session.save(err => { // 세션 저장
        if (err) throw err;
        res.json({ success: true, user: result[0] }); // 사용자 정보 반환
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
